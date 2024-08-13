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

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createClientFn, isPending: isLoadingCreateClient } =
    useMutation({
      mutationFn: clientRepository.create,
    })

  const createClient = useCallback(
    async (data: TCreateClientParams) => {
      try {
        await createClientFn(data)
        toast.success('Cliente cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar o cliente.')
      }
    },
    [createClientFn, queryClient],
  )

  return {
    createClient,
    isLoadingCreateClient,
  }
}
