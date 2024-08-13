import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createUserFn, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: userRepository.create,
    })

  const createUser = useCallback(
    async (data: TCreateUserParams) => {
      try {
        await createUserFn(data)
        toast.success('Usuário cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar o usuário.')
      }
    },
    [createUserFn, queryClient],
  )

  return {
    createUser,
    isLoadingCreateUser,
  }
}
