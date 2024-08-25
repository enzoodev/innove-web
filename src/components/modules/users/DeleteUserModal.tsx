import React, { Fragment } from 'react'

import { useDeleteUser } from '@/hooks/user/useDeleteUser'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'

type Props = {
  isOpen: boolean
  item: {
    name: string
    id: number
  }
  onClose: () => void
}

export const DeleteUserModal: React.FC<Props> = ({ isOpen, item, onClose }) => {
  const { handleDeleteUser, isLoadingDeleteUser } = useDeleteUser(item.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inativar usuário"
      footer={
        <Fragment>
          <Button
            onClick={onClose}
            title="Cancelar"
            itsCancelButton
            additionalClasses="bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            color="text-gray-700"
          />
          <Button
            onClick={() => handleDeleteUser(onClose)}
            title="Confirmar"
            additionalClasses="w-36 bg-red-700 hover:bg-red-800 active:bg-red-900"
            isLoading={isLoadingDeleteUser}
          />
        </Fragment>
      }
    >
      <p className="text-sm text-gray-600">
        Você tem certeza que deseja inativar o usuário <b>{item.name}</b> ?
      </p>
    </Modal>
  )
}
