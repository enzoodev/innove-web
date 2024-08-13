import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useDeleteUser = (userId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserFn, isPending: isLoadingDeleteUser } =
    useMutation({
      mutationFn: userRepository.delete,
    })

  const deleteUser = useCallback(async () => {
    try {
      await deleteUserFn({ iduser: userId, idclient: clientId })
      toast.success('Usuário excluido com sucesso!')
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_USER_BY_ID, userId],
      })
    } catch (error) {
      toast.error('Não foi possível excluir o usuário.')
    }
  }, [deleteUserFn, userId, clientId, queryClient])

  return {
    deleteUser,
    isLoadingDeleteUser,
  }
}
