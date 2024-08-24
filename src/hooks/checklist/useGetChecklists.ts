import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth/useAuth'

import { getAllChecklists } from '@/query/checklist/getAllChecklists'

import { QueryKey } from '@/enums/QueryKey'

import { filterData } from '@/utils/filterData'

export const useGetChecklists = () => {
  const [searchText, setSearchText] = useState('')
  const { clientId } = useAuth()

  const { data: checklists, isFetching: isLoadingGetChecklists } = useQuery({
    enabled: !!clientId,
    queryKey: [QueryKey.GET_CHECKLISTS],
    queryFn: async () => {
      try {
        return await getAllChecklists({ idclient: clientId })
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
