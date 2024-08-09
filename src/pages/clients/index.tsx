import { useCallback } from 'react'
import { NextPage } from 'next'
import { useClients } from '@/hooks/useClients'

import { List } from '@/components/elements/List'
import { LayoutApp } from '@/components/layout/LayoutApp'
import { ClientItem } from '@/components/modules/ClientItem'

const Clients: NextPage = () => {
  const {
    clients,
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
  } = useClients()

  const renderItem: ListRenderItem<TClient> = useCallback(
    ({ item }) => <ClientItem item={item} />,
    [],
  )

  const renderItemLoading: ListRenderItemLoading = useCallback(
    ({ index }) => (
      <div>
        <h1>Loading...</h1>
      </div>
    ),
    [],
  )

  return (
    <LayoutApp
      title="Clientes"
      headTitle="Clientes - Innove"
      searchText={searchText}
      setSearchText={setSearchText}
    >
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        <List
          items={clients}
          itemSize={72}
          isLoading={isLoadingGetClients}
          renderItem={renderItem}
          renderItemLoading={renderItemLoading}
          EmptyIcon={
            <div>
              <h1>Nenhum cliente encontrado</h1>
            </div>
          }
        />
      </div>
    </LayoutApp>
  )
}

export default Clients
