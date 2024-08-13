import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ClientRepository } from '@/infrastructure/repositories/ClientRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const clientRepository = new ClientRepository(baseRepository)

export const useUpdateClient = (clientId: number) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getClientByIdFn, isPending: isLoadingClient } =
    useMutation({
      mutationKey: [QueryKey.GET_CLIENT_BY_ID, clientId],
      mutationFn: clientRepository.getById,
    })

  const { mutateAsync: updateClientFn, isPending: isLoadingUpdateClient } =
    useMutation({
      mutationFn: clientRepository.update,
    })

  const fetchClient = useCallback(async () => {
    try {
      const client = await getClientByIdFn({ idclient: clientId })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do cliente.')
    }
  }, [clientId, getClientByIdFn])

  const updateClient = useCallback(
    async (data: TUpdateClientParams) => {
      try {
        await updateClientFn(data)
        toast.success('Cliente atualizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CLIENT_BY_ID, clientId],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar o cliente.')
      }
    },
    [updateClientFn, queryClient, clientId],
  )

  return {
    fetchClient,
    updateClient,
    isLoadingClient,
    isLoadingUpdateClient,
  }
}
