import React, { Fragment } from 'react'

import { useDeleteClient } from '@/hooks/client/useDeleteClient'

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

export const DeleteClientModal: React.FC<Props> = ({
  isOpen,
  item,
  onClose,
}) => {
  const { handleDeleteClient, isLoadingDeleteClient } = useDeleteClient(item.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inativar cliente"
      footer={
        <Fragment>
          <Button
            onClick={onClose}
            title="Cancelar"
            normalText
            additionalClasses="bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            color="text-gray-700"
          />
          <Button
            onClick={() => handleDeleteClient(onClose)}
            title="Confirmar"
            additionalClasses="w-36 bg-red-700 hover:bg-red-800 active:bg-red-900"
            isLoading={isLoadingDeleteClient}
          />
        </Fragment>
      }
    >
      <p className="text-sm text-gray-600">
        Você tem certeza que deseja inativar o cliente <b>{item.name}</b> ?
      </p>
    </Modal>
  )
}
