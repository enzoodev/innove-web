import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { filterData } from '@/utils/filterData'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const userRepository = new UserRepository(baseRepository)

export const useGetUsers = () => {
  const [searchText, setSearchText] = useState('')
  const { clientId } = useAuth()

  const { data: users, isLoading: isLoadingGetUsers } = useQuery({
    queryKey: [QueryKey.GET_USERS],
    queryFn: async () => {
      try {
        return await userRepository.getAll({ idclient: clientId })
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
