import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth/useAuth'

import { getAllLocations } from '@/query/location/getAllLocations'

import { QueryKey } from '@/enums/QueryKey'

import { filterData } from '@/utils/filterData'

export const useGetLocations = () => {
  const [searchText, setSearchText] = useState('')
  const { clientId } = useAuth()

  const { data: locations, isLoading: isLoadingGetLocations } = useQuery({
    queryKey: [QueryKey.GET_LOCATIONS],
    queryFn: async () => {
      try {
        return await getAllLocations({ idclient: clientId })
      } catch (error) {
        toast.error('Não foi possível buscar as inspeções.')
        throw error
      }
    },
  })

  const filteredLocations = useMemo(
    () => ({
      area: filterData(searchText, locations?.Area),
      construction: filterData(searchText, locations?.Equipamento),
      equipment: filterData(searchText, locations?.Equipamento),
    }),
    [locations, searchText],
  )

  return {
    locations: filteredLocations,
    isLoadingGetLocations,
    searchText,
    setSearchText,
  }
}
