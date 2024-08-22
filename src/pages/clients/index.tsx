import { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { IconUserOff } from '@tabler/icons-react'

import { useToggle } from '@/hooks/shared/useToggle'
import { useGetClients } from '@/hooks/client/useGetClients'

import { ListSeparators } from '@/utils/ListSeparators'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { ListEmpty } from '@/components/elements/ListEmpty'
import { ClientItem } from '@/components/modules/clients/ClientItem'
import { ClientSkeletonItem } from '@/components/modules/clients/ClientSkeletonItem'
import { DeleteClientModal } from '@/components/modules/clients/DeleteClientModal'
import { CreateClientModal } from '@/components/modules/clients/CreateClientModal'
import { UpdateClientModal } from '@/components/modules/clients/UpdateClientModal'

const Clients: NextPage = () => {
  const { clients, isLoadingGetClients, searchText, setSearchText } =
    useGetClients()

  const [isOpenCreateModal, toggleOpenCreateModal] = useToggle()
  const [isOpenUpdateModal, toggleOpenUpdateModal] = useToggle()
  const [isOpenDeleteModal, toggleOpenDeleteModal] = useToggle()
  const [client, setClient] = useState({
    id: 0,
    name: '',
  })

  const handleUpdate = useCallback(
    (client: TClient) => {
      setClient({
        id: client.idclient,
        name: client.name,
      })
      toggleOpenUpdateModal()
    },
    [toggleOpenUpdateModal],
  )

  const handleDelete = useCallback(
    (client: TClient) => {
      setClient({
        id: client.idclient,
        name: client.name,
      })
      toggleOpenDeleteModal()
    },
    [toggleOpenDeleteModal],
  )

  const renderItems = useCallback(() => {
    if (isLoadingGetClients) {
      return (
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          {Array.from({ length: 6 }).map((_, index, array) => {
            const hasSeparator = ListSeparators.getHasSeparator(index, array)
            return (
              <div key={index}>
                <ClientSkeletonItem />
                {hasSeparator && <hr className="border-t border-gray-300" />}
              </div>
            )
          })}
        </div>
      )
    }

    if (clients.length === 0) {
      return (
        <ListEmpty
          renderIcon={() => (
            <IconUserOff stroke={1.5} className="w-7 h-7 text-gray-700" />
          )}
          title="Nenhum cliente encontrado."
        />
      )
    }

    return (
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        {clients.map((item, index, array) => {
          const hasSeparator = ListSeparators.getHasSeparator(index, array)
          return (
            <div key={item.idclient}>
              <ClientItem
                item={item}
                onUpdate={() => handleUpdate(item)}
                onDelete={() => handleDelete(item)}
              />
              {hasSeparator && <hr className="border-t border-gray-300" />}
            </div>
          )
        })}
      </div>
    )
  }, [clients, handleDelete, handleUpdate, isLoadingGetClients])

  return (
    <LayoutApp
      title="Clientes"
      headTitle="Clientes - Innove"
      onCreate={toggleOpenCreateModal}
      headerRightComponent={
        <div className="w-full sm:w-72 lg:w-96">
          <Input
            placeholder="Qual cliente você procura?"
            hasLabel={false}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search"
            autoFocus
            spellCheck={false}
            additionalClasses="bg-gray-300 placeholder-gray-500"
          />
        </div>
      }
    >
      {renderItems()}
      <CreateClientModal
        isOpen={isOpenCreateModal}
        onClose={toggleOpenCreateModal}
      />
      <UpdateClientModal
        clientId={client.id}
        isOpen={isOpenUpdateModal}
        onClose={toggleOpenUpdateModal}
      />
      <DeleteClientModal
        item={client}
        isOpen={isOpenDeleteModal}
        onClose={toggleOpenDeleteModal}
      />
    </LayoutApp>
  )
}

export default Clients
