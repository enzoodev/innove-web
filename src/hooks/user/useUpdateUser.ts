import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import { saveUserSchema, TSaveUserSchema } from '@/schemas/user/saveUserSchema'

import { getUserById } from '@/query/user/getUserById'
import { updateUser } from '@/query/user/updateUser'

import { QueryKey } from '@/enums/QueryKey'

import { permissions } from '@/utils/constants/permissions'

export const useUpdateUser = (userId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getUserByIdFn, isPending: isLoadingUser } = useMutation({
    mutationFn: getUserById,
  })

  const { mutateAsync: updateUserFn, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: updateUser,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
    setValue,
    control,
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

  const fetchUser = useCallback(async () => {
    try {
      const user = await getUserByIdFn({
        iduser: userId,
        idclient: clientId,
      })

      reset({
        nome: user.name,
        telefone: user.phone,
        email: user.email,
        ativo: user.status === '1',
        permission: permissions.map((item) => ({
          ...item,
          isActive: user.permissions.some(
            (permission) => permission.idpermission === item.value,
          ),
        })),
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do usuário.')
    }
  }, [getUserByIdFn, userId, clientId, reset])

  const onSubmit = useCallback(
    async (data: TSaveUserSchema, callback: () => void) => {
      try {
        await updateUserFn({
          ...data,
          ativo: data.ativo ? '1' : '0',
          permission: data.permission
            .filter((item) => item.isActive)
            .map((item) => parseInt(item.value)),
          idclient: clientId.toString(),
          iduser: userId.toString(),
        })
        callback()
        toast.success('Usuário editado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar o usuário.')
      }
    },
    [updateUserFn, clientId, userId, queryClient, reset],
  )

  const handleUpdateUser = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    fetchUser,
    handleUpdateUser,
    isLoadingUser,
    isLoadingUpdateUser,
    register,
    control,
    errors,
    userIsActive,
    userPermissions,
    handleUserActiveChange,
    handlePermissionChange,
  }
}
