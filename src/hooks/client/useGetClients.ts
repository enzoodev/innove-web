import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { ClientRepository } from '@/infrastructure/repositories/ClientRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { filterData } from '@/utils/filterData'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const clientRepository = new ClientRepository(baseRepository)

export const useGetClients = () => {
  const [searchText, setSearchText] = useState('')

  const { data: clients, isLoading: isLoadingGetClients } = useQuery({
    queryKey: [QueryKey.GET_CLIENTS],
    queryFn: async () => {
      try {
        return await clientRepository.getAll()
      } catch (error) {
        toast.error('Não foi possível buscar os clientes.')
        throw error
      }
    },
  })

  const filteredClients = useMemo(
    () => filterData(searchText, clients),
    [clients, searchText],
  )

  return {
    clients: filteredClients,
    isLoadingGetClients,
    searchText,
    setSearchText,
  }
}
