import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

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

  const fetchUser = useCallback(async () => {
    try {
      const user = await getUserByIdFn({
        iduser: userId,
        idclient: clientId,
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do usuário.')
    }
  }, [userId, clientId, getUserByIdFn])

  const updateUser = useCallback(
    async (data: TUpdateUserParams) => {
      try {
        await updateUserFn(data)
        toast.success('Usuário atualizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_USER_BY_ID, userId],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar o usuário.')
      }
    },
    [updateUserFn, queryClient, userId],
  )

  return {
    fetchUser,
    updateUser,
    isLoadingUser,
    isLoadingUpdateUser,
  }
}
