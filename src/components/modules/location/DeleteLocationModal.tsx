import React, { Fragment } from 'react'

import { useDeleteLocation } from '@/hooks/location/useDeleteLocation'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'

type Props = {
  isOpen: boolean
  item: {
    name: string
    id: number
    type: {
      id: number
      key: TLocationTypeKey
    }
  }
  onClose: () => void
}

export const DeleteLocationModal: React.FC<Props> = ({
  isOpen,
  item,
  onClose,
}) => {
  const { handleDeleteLocation, isLoadingDeleteLocation } = useDeleteLocation({
    locationId: item.id,
    locationType: {
      id: item.type.id,
      key: item.type.key,
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir inspeção"
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
            onClick={() => handleDeleteLocation(onClose)}
            title="Confirmar"
            additionalClasses="w-36 bg-red-700 hover:bg-red-800 active:bg-red-900"
            isLoading={isLoadingDeleteLocation}
          />
        </Fragment>
      }
    >
      <p className="text-sm text-gray-600">
        Você tem certeza que deseja excluir a inspeção de {item.type.key}:{' '}
        <b>{item.name}</b> ?
      </p>
    </Modal>
  )
}
