import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { LocationRepository } from '@/infrastructure/repositories/LocationRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { filterData } from '@/utils/filterData'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const locationRepository = new LocationRepository(baseRepository)

export const useGetLocations = () => {
  const [searchText, setSearchText] = useState('')
  const { clientId } = useAuth()

  const { data: locations, isLoading: isLoadingGetLocations } = useQuery({
    queryKey: [QueryKey.GET_LOCATIONS],
    queryFn: async () => {
      try {
        return await locationRepository.getAll({ idclient: clientId })
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
