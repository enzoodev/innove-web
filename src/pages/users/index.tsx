import { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { IconUserOff } from '@tabler/icons-react'

import { useToggle } from '@/hooks/shared/useToggle'
import { useGetUsers } from '@/hooks/user/useGetUsers'

import { ListSeparators } from '@/utils/ListSeparators'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { ListEmpty } from '@/components/elements/ListEmpty'
import { UserItem } from '@/components/modules/users/UserItem'
import { UserSkeletonItem } from '@/components/modules/users/UserSkeletonItem'
import { DeleteUserModal } from '@/components/modules/users/DeleteUserModal'
import { CreateUserModal } from '@/components/modules/users/CreateUserModal'
import { UpdateUserModal } from '@/components/modules/users/UpdateUserModal'

const Users: NextPage = () => {
  const { users, isLoadingGetUsers, searchText, setSearchText } = useGetUsers()

  const [isOpenCreateModal, toggleOpenCreateModal] = useToggle()
  const [isOpenUpdateModal, toggleOpenUpdateModal] = useToggle()
  const [isOpenDeleteModal, toggleOpenDeleteModal] = useToggle()
  const [user, setUser] = useState({
    id: 0,
    name: '',
  })

  const handleUpdate = useCallback(
    (user: TUser) => {
      setUser({
        id: user.iduser,
        name: user.name,
      })
      toggleOpenUpdateModal()
    },
    [toggleOpenUpdateModal],
  )

  const handleDelete = useCallback(
    (user: TUser) => {
      setUser({
        id: user.iduser,
        name: user.name,
      })
      toggleOpenDeleteModal()
    },
    [toggleOpenDeleteModal],
  )

  const renderItems = useCallback(() => {
    if (isLoadingGetUsers) {
      return (
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          {Array.from({ length: 6 }).map((_, index, array) => {
            const hasSeparator = ListSeparators.getHasSeparator(index, array)
            return (
              <div key={index}>
                <UserSkeletonItem />
                {hasSeparator && <hr className="border-t border-gray-300" />}
              </div>
            )
          })}
        </div>
      )
    }

    if (users.length === 0) {
      return (
        <ListEmpty
          renderIcon={() => (
            <IconUserOff stroke={1.5} className="w-7 h-7 text-gray-700" />
          )}
          title="Nenhum usuário encontrado."
        />
      )
    }

    return (
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        {users.map((item, index, array) => {
          const hasSeparator = ListSeparators.getHasSeparator(index, array)
          return (
            <div key={item.iduser}>
              <UserItem
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
  }, [users, handleDelete, handleUpdate, isLoadingGetUsers])

  return (
    <LayoutApp
      title="Usuários"
      headTitle="Usuários - Innove"
      onCreate={toggleOpenCreateModal}
      headerRightComponent={
        <div className="w-full sm:w-72 lg:w-96">
          <Input
            placeholder="Qual usuário você procura?"
            hasLabel={false}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search"
            spellCheck={false}
            additionalClasses="bg-gray-300 placeholder-gray-500"
          />
        </div>
      }
    >
      {renderItems()}
      <CreateUserModal
        isOpen={isOpenCreateModal}
        onClose={toggleOpenCreateModal}
      />
      <UpdateUserModal
        userId={user.id}
        isOpen={isOpenUpdateModal}
        onClose={toggleOpenUpdateModal}
      />
      <DeleteUserModal
        item={user}
        isOpen={isOpenDeleteModal}
        onClose={toggleOpenDeleteModal}
      />
    </LayoutApp>
  )
}

export default Users
