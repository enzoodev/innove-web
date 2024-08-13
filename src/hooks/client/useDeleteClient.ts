import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ClientRepository } from '@/infrastructure/repositories/ClientRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const clientRepository = new ClientRepository(baseRepository)

export const useDeleteClient = (clientId: number) => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteClientFn, isPending: isLoadingDeleteClient } =
    useMutation({
      mutationFn: clientRepository.delete,
    })

  const deleteClient = useCallback(async () => {
    try {
      await deleteClientFn({ idclient: clientId })
      toast.success('Cliente excluido com sucesso!')
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_CLIENT_BY_ID, clientId],
      })
    } catch (error) {
      toast.error('Não foi possível excluir o cliente.')
    }
  }, [clientId, deleteClientFn, queryClient])

  return {
    deleteClient,
    isLoadingDeleteClient,
  }
}
