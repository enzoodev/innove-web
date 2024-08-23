import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import { saveUserSchema, TSaveUserSchema } from '@/schemas/user/saveUserSchema'

import { createUser } from '@/query/user/createUser'

import { QueryKey } from '@/enums/QueryKey'

import { permissions } from '@/utils/constants/permissions'

export const useCreateUser = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: createUserFn, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: createUser,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
    setValue,
  } = useForm<TSaveUserSchema>({
    resolver: zodResolver(saveUserSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      ativo: true,
      permission: permissions.map((item) => ({ ...item, isActive: false })),
    },
  })
  const registerWithMask = useHookFormMask(register)

  const userPermissions = watch('permission')
  const userIsActive = watch('ativo')

  const handlePermissionChange = useCallback(
    (index: number) => {
      setValue(`permission.${index}.isActive`, !userPermissions[index].isActive)
    },
    [setValue, userPermissions],
  )

  const handleUserActiveChange = useCallback(() => {
    setValue('ativo', !userIsActive)
  }, [setValue, userIsActive])

  const onSubmit = useCallback(
    async (data: TSaveUserSchema, callback: () => void) => {
      try {
        await createUserFn({
          ...data,
          idclient: clientId.toString(),
          permission: data.permission
            .filter((item) => item.isActive)
            .map((item) => parseInt(item.value)),
          ativo: data.ativo ? '1' : '0',
        })
        callback()
        toast.success('Usuário cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível cadastrar o usuário.')
      }
    },
    [clientId, createUserFn, queryClient, reset],
  )

  const handleCreateUser = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    handleCreateUser,
    isLoadingCreateUser,
    register,
    registerWithMask,
    errors,
    userIsActive,
    userPermissions,
    handleUserActiveChange,
    handlePermissionChange,
  }
}
