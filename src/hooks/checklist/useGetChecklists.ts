import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ChecklistRepository } from '@/infrastructure/repositories/ChecklistRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { filterData } from '@/utils/filterData'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const checklistRepository = new ChecklistRepository(baseRepository)

export const useGetChecklists = () => {
  const [searchText, setSearchText] = useState('')

  const { data: checklists, isLoading: isLoadingGetChecklists } = useQuery({
    queryKey: [QueryKey.GET_CHECKLISTS],
    queryFn: async () => {
      try {
        return await checklistRepository.getAll()
      } catch (error) {
        toast.error('Não foi possível buscar os checklists.')
        throw error
      }
    },
  })

  const filteredChecklists = useMemo(
    () => filterData(searchText, checklists),
    [checklists, searchText],
  )

  return {
    checklists: filteredChecklists,
    isLoadingGetChecklists,
    searchText,
    setSearchText,
  }
}
