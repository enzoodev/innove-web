import { useCallback } from 'react'
import { NextPage } from 'next'

import { useGetClients } from '@/hooks/client/useGetClients'

import { ListSeparators } from '@/utils/ListSeparators'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { ClientItem } from '@/components/modules/ClientItem'
import { ClientSkeletonItem } from '@/components/modules/ClientSkeletonItem'

const Clients: NextPage = () => {
  const { clients, isLoadingGetClients, searchText, setSearchText } =
    useGetClients()

  const renderItems = useCallback(() => {
    if (isLoadingGetClients) {
      return Array.from({ length: 10 }).map((_, index, array) => {
        const hasSeparator = ListSeparators.getHasSeparator(index, array)
        return (
          <div key={index}>
            <ClientSkeletonItem />
            {hasSeparator && <hr className="border-t border-gray-300" />}
          </div>
        )
      })
    }

    if (clients.length === 0) {
      return (
        <div>
          <h1>Nenhum cliente encontrado</h1>
        </div>
      )
    }

    return clients.map((item, index, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(index, array)
      return (
        <div key={item.idclient}>
          <ClientItem item={item} />
          {hasSeparator && <hr className="border-t border-gray-300" />}
        </div>
      )
    })
  }, [clients, isLoadingGetClients])

  return (
    <LayoutApp
      title="Clientes"
      headTitle="Clientes - Innove"
      searchText={searchText}
      setSearchText={setSearchText}
    >
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        {renderItems()}
      </div>
    </LayoutApp>
  )
}

export default Clients
