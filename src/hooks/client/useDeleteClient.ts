import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteClient } from '@/query/client/deleteClient'

import { QueryKey } from '@/enums/QueryKey'

export const useDeleteClient = (clientId: number) => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteClientFn, isPending: isLoadingDeleteClient } =
    useMutation({
      mutationFn: deleteClient,
    })

  const handleDeleteClient = useCallback(
    async (callback: () => void) => {
      try {
        await deleteClientFn({ idclient: clientId })
        callback()
        toast.success('Cliente excluido com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
      } catch (error) {
        toast.error('Não foi possível excluir o cliente.')
      }
    },
    [clientId, deleteClientFn, queryClient],
  )

  return {
    handleDeleteClient,
    isLoadingDeleteClient,
  }
}
