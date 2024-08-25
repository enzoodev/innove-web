import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth/useAuth'

import { deleteUser } from '@/query/user/deleteUser'

import { QueryKey } from '@/enums/QueryKey'

export const useDeleteUser = (userId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserFn, isPending: isLoadingDeleteUser } =
    useMutation({
      mutationFn: deleteUser,
    })

  const handleDeleteUser = useCallback(
    async (callback: () => void) => {
      try {
        await deleteUserFn({ iduser: userId, idclient: clientId })
        callback()
        toast.success('Usuário excluido com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
      } catch (error) {
        toast.error('Não foi possível inativar o usuário.')
      }
    },
    [deleteUserFn, userId, clientId, queryClient],
  )

  return {
    handleDeleteUser,
    isLoadingDeleteUser,
  }
}
