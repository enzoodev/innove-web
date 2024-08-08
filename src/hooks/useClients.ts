import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'

import { ClientRepository } from '@/repositories/ClientRepository'

import { useRefresh } from './useRefresh'
import { useToggle } from './useToggle'

export const useClients = () => {
  const { key, refresh } = useRefresh()
  const [isOpenCreateClientModal, toggleOpenCreateClientModal] = useToggle()
  const [isOpenUpdateClientModal, toggleOpenUpdateClientModal] = useToggle()

  const { data: clients, isLoading: isLoadingGetClients } = useQuery({
    queryKey: ['get-clients', key],
    queryFn: async () => {
      try {
        return await ClientRepository.getClients()
      } catch (error) {
        toast.error('Não foi possível buscar os clientes.')
        throw error
      }
    },
  })

  const { mutateAsync: createClientFn, isPending: isLoadingCreateClient } =
    useMutation({
      mutationFn: ClientRepository.createClient,
    })

  const { mutateAsync: updateClientFn, isPending: isLoadingUpdateClient } =
    useMutation({
      mutationFn: ClientRepository.updateClient,
    })

  const handleCreateClient = useCallback(
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

  const handleUpdateClient = useCallback(
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
    clients: clients ?? [],
    isLoadingGetClients,
    isLoadingCreateClient,
    isLoadingUpdateClient,
    handleCreateClient,
    handleUpdateClient,
    isOpenCreateClientModal,
    isOpenUpdateClientModal,
    toggleOpenCreateClientModal,
    toggleOpenUpdateClientModal,
  }
}
