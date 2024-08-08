import { NextPage } from 'next'

import { useClients } from '@/hooks/useClients'

import { List } from '@/components/elements/List'
import { LayoutApp } from '@/components/layout/LayoutApp'

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

  const renderItem: ListRenderItem<TClient> = ({ item }) => {
    return (
      <div>
        <h1>{item.name}</h1>
        <p>{item.cnpj}</p>
      </div>
    )
  }

  const renderItemLoading: ListRenderItemLoading = ({ index }) => {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <LayoutApp title="Clientes" headTitle="Clients - Innove">
      <List
        items={clients}
        itemSize={100}
        isLoading={isLoadingGetClients}
        renderItem={renderItem}
        renderItemLoading={renderItemLoading}
        EmptyIcon={
          <div>
            <h1>Nenhum cliente encontrado</h1>
          </div>
        }
      />
    </LayoutApp>
  )
}

export default Clients
