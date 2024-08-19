import { Fragment } from 'react'

import { useCreateClient } from '@/hooks/client/useCreateClient'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateClientModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateClient,
    isLoadingCreateClient,
    register,
    errors,
    handleFileIcon,
    handleFileLogo,
  } = useCreateClient()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Criar cliente"
      footer={
        <Fragment>
          <Button
            title="Voltar"
            itsCancelButton
            additionalClasses="bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            color="text-gray-700"
            onClick={onClose}
          />
          <Button
            title="Salvar"
            additionalClasses="w-36 bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900"
            isLoading={isLoadingCreateClient}
            onClick={handleCreateClient}
          />
        </Fragment>
      }
    >
      <p className="text-sm text-gray-600">
        Você tem certeza que deseja excluir o cliente
      </p>
    </Modal>
  )
}
