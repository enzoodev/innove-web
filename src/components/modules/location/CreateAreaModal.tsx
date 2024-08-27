import { Fragment } from 'react'

import { useCreateArea } from '@/hooks/location/useCreateArea'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateAreaModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateArea,
    isLoadingCreateArea,
    register,
    errors,
    isActive,
    handleActiveChange,
  } = useCreateArea()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar área"
      onSubmit={handleCreateArea(onClose)}
      size="lg"
      footer={
        <Fragment>
          <Button
            title="Voltar"
            normalText
            additionalClasses="w-36 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            color="text-gray-700"
            onClick={onClose}
          />
          <Button
            title="Salvar"
            additionalClasses="w-44 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingCreateArea}
            type="submit"
          />
        </Fragment>
      }
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder="Nome"
            formError={errors.nome?.message}
            name="nome"
            register={register}
          />
        </div>
        <Input
          placeholder="Nome do responsável"
          name="responsavelnome"
          formError={errors.responsavelnome?.message}
          register={register}
        />
        <Input
          placeholder="Email do responsável"
          type="email"
          name="responsavelemail"
          formError={errors.responsavelemail?.message}
          register={register}
        />
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se a área está ativa ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
          />
        </div>
      </div>
    </Modal>
  )
}
