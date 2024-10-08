import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/auth/useAuth'

import { getAllClients } from '@/query/client/getAllClients'

import { QueryKey } from '@/enums/QueryKey'

import { filterData } from '@/utils/filterData'

export const useGetClients = () => {
  const { userId } = useAuth()
  const [searchText, setSearchText] = useState('')

  const { data: clients, isFetching: isLoadingGetClients } = useQuery({
    enabled: !!userId,
    queryKey: [QueryKey.GET_CLIENTS],
    queryFn: async () => {
      try {
        return await getAllClients()
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
