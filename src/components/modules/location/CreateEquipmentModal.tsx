import { Fragment } from 'react'

import { useCreateEquipment } from '@/hooks/location/useCreateEquipment'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateEquipmentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateEquipment,
    isLoadingCreateEquipment,
    register,
    errors,
    isActive,
    handleActiveChange,
  } = useCreateEquipment()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar equipamento"
      onSubmit={handleCreateEquipment(onClose)}
      size="lg"
      footer={
        <Fragment>
          <Button
            title="Voltar"
            itsCancelButton
            additionalClasses="w-36 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            color="text-gray-700"
            onClick={onClose}
          />
          <Button
            title="Salvar"
            additionalClasses="w-44 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingCreateEquipment}
            type="submit"
          />
        </Fragment>
      }
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder="Nome"
            formError={errors.tipoequipamento?.message}
            name="tipoequipamento"
            autoFocus
            register={register}
          />
        </div>
        <Input
          placeholder="Modelo"
          name="modelo"
          formError={errors.modelo?.message}
          register={register}
          autoFocus
        />
        <Input
          placeholder="Placa"
          name="placa"
          formError={errors.placa?.message}
          register={register}
          autoFocus
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder="Tag"
            name="tag"
            formError={errors.tag?.message}
            register={register}
            autoFocus
          />
        </div>
        <Input
          placeholder="Nome do responsável"
          name="responsavelnome"
          formError={errors.responsavelnome?.message}
          register={register}
          autoFocus
        />
        <Input
          placeholder="Email do responsável"
          type="email"
          name="responsavelemail"
          formError={errors.responsavelemail?.message}
          register={register}
          autoFocus
        />
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se o equipamento está ativo ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
          />
        </div>
      </div>
    </Modal>
  )
}
