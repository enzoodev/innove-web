import { useCallback } from 'react'
import { NextPage } from 'next'

import { useGetUsers } from '@/hooks/user/useGetUsers'

import { ListSeparators } from '@/utils/ListSeparators'

import { LayoutApp } from '@/components/layout/LayoutApp'

const Users: NextPage = () => {
  const { users, isLoadingGetUsers, searchText, setSearchText } = useGetUsers()

  const renderItems = useCallback(() => {
    if (isLoadingGetUsers) {
      return Array.from({ length: 10 }).map((_, index, array) => {
        const hasSeparator = ListSeparators.getHasSeparator(index, array)
        return (
          <div key={index}>
            {/* <UserSkeletonItem /> */}
            {hasSeparator && <hr className="border-t border-gray-300" />}
          </div>
        )
      })
    }

    if (users.length === 0) {
      return (
        <div>
          <h1>Nenhum usuário encontrado</h1>
        </div>
      )
    }

    return users.map((item, index, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(index, array)
      return (
        <div key={item.iduser}>
          {/* <UserItem item={item} /> */}
          {hasSeparator && <hr className="border-t border-gray-300" />}
        </div>
      )
    })
  }, [users, isLoadingGetUsers])

  return (
    <LayoutApp
      title="Usuários"
      headTitle="Usuários - Innove"
      searchText={searchText}
      setSearchText={setSearchText}
    >
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        {renderItems()}
      </div>
    </LayoutApp>
  )
}

export default Users
