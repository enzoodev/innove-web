import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { saveUserSchema, TSaveUserSchema } from '@/schemas/user/saveUserSchema'
import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useUpdateUser = (userId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getUserByIdFn, isPending: isLoadingUser } = useMutation({
    mutationKey: [QueryKey.GET_USER_BY_ID, userId],
    mutationFn: userRepository.getById,
  })

  const { mutateAsync: updateUserFn, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: userRepository.update,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<TSaveUserSchema>({
    resolver: zodResolver(saveUserSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      ativo: true,
      permission: [],
    },
  })

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
        ativo: user.statususer === '1',
        permission: user.permission.map((permission) =>
          parseInt(permission.idpermission),
        ),
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do usuário.')
    }
  }, [getUserByIdFn, userId, clientId, reset])

  const onSubmit: SubmitHandler<TSaveUserSchema> = useCallback(
    async (data) => {
      try {
        await updateUserFn({
          ...data,
          ativo: data.ativo ? '1' : '0',
          idclient: clientId.toString(),
          iduser: userId.toString(),
        })
        toast.success('Usuário atualizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_USER_BY_ID, userId],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível atualizar o usuário.')
      }
    },
    [updateUserFn, clientId, userId, queryClient, reset],
  )

  const handleCreateUser = handleSubmit(onSubmit)

  return {
    fetchUser,
    handleCreateUser,
    isLoadingUser,
    isLoadingUpdateUser,
    register,
    errors,
  }
}
