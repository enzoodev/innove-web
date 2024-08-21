import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth/useAuth'

import { getAllUsers } from '@/query/user/getAllUsers'

import { QueryKey } from '@/enums/QueryKey'

import { filterData } from '@/utils/filterData'

export const useGetUsers = () => {
  const [searchText, setSearchText] = useState('')
  const { clientId } = useAuth()

  const { data: users, isLoading: isLoadingGetUsers } = useQuery({
    queryKey: [QueryKey.GET_USERS],
    queryFn: async () => {
      try {
        return await getAllUsers({ idclient: clientId })
      } catch (error) {
        toast.error('Não foi possível buscar os usuários.')
        throw error
      }
    },
  })

  const filteredUsers = useMemo(
    () => filterData(searchText, users),
    [users, searchText],
  )

  return {
    users: filteredUsers,
    isLoadingGetUsers,
    searchText,
    setSearchText,
  }
}
