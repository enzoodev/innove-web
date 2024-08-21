import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { saveUserSchema, TSaveUserSchema } from '@/schemas/user/saveUserSchema'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { permissions } from '@/utils/constants/permissions'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useCreateUser = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: createUserFn, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: (params: TCreateUserParams) => userRepository.create(params),
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
        console.log(error)
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
    errors,
    userIsActive,
    userPermissions,
    handleUserActiveChange,
    handlePermissionChange,
  }
}
