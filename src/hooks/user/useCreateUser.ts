import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { saveUserSchema, TSaveUserSchema } from '@/schemas/user/saveUser'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useCreateUser = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: createUserFn, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: userRepository.create,
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

  const onSubmit: SubmitHandler<TSaveUserSchema> = useCallback(
    async (data) => {
      try {
        await createUserFn({
          ...data,
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        toast.success('Usuário cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível cadastrar o usuário.')
      }
    },
    [clientId, createUserFn, queryClient, reset],
  )

  const handleCreateUser = handleSubmit(onSubmit)

  return {
    handleCreateUser,
    isLoadingCreateUser,
    register,
    errors,
  }
}
