import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'

import { ClientRepository } from '@/infrastructure/repositories/ClientRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { createHttpService } from '@/infrastructure/dependencies/HttpServiceFactory'

import { UrlBuilder } from '@/utils/UrlBuilder'

import { useRefresh } from './useRefresh'
import { useToggle } from './useToggle'

const baseRepository = new BaseRepository(createHttpService(), new UrlBuilder())
const clientRepository = new ClientRepository(baseRepository)

export const useClients = () => {
  const { key, refresh } = useRefresh()
  const [isOpenCreateClientModal, toggleOpenCreateClientModal] = useToggle()
  const [isOpenUpdateClientModal, toggleOpenUpdateClientModal] = useToggle()
  const [searchText, setSearchText] = useState('')

  const { data: clients, isLoading: isLoadingGetClients } = useQuery({
    queryKey: ['get-clients', key],
    queryFn: async () => {
      try {
        return await clientRepository.getAll()
      } catch (error) {
        toast.error('Não foi possível buscar os clientes.')
        throw error
      }
    },
  })

  const filteredClients = useMemo(() => {
    if (!clients) return []

    return clients.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    )
  }, [clients, searchText])

  const { mutateAsync: createClientFn, isPending: isLoadingCreateClient } =
    useMutation({
      mutationFn: clientRepository.create,
    })

  const { mutateAsync: updateClientFn, isPending: isLoadingUpdateClient } =
    useMutation({
      mutationFn: clientRepository.update,
    })

  const createClient = useCallback(
    async (data: TCreateClientParams) => {
      try {
        await createClientFn(data)
        toggleOpenCreateClientModal()
        toast.success('Cliente cadastrado com sucesso!')
        refresh()
      } catch (error) {
        toast.error('Não foi possível cadastrar o cliente.')
      }
    },
    [createClientFn, refresh, toggleOpenCreateClientModal],
  )

  const updateClient = useCallback(
    async (data: TUpdateClientParams) => {
      try {
        await updateClientFn(data)
        toggleOpenUpdateClientModal()
        toast.success('Cliente atualizado com sucesso!')
        refresh()
      } catch (error) {
        toast.error('Não foi possível atualizar o cliente.')
      }
    },
    [updateClientFn, toggleOpenUpdateClientModal, refresh],
  )

  return {
    clients: filteredClients,
    isLoadingGetClients,
    isLoadingCreateClient,
    isLoadingUpdateClient,
    createClient,
    updateClient,
    isOpenCreateClientModal,
    isOpenUpdateClientModal,
    toggleOpenCreateClientModal,
    toggleOpenUpdateClientModal,
    searchText,
    setSearchText,
  }
}
