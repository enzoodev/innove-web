import { Fragment, useEffect } from 'react'

import { useUpdateEquipment } from '@/hooks/location/useUpdateEquipment'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  locationId: number
  locationTypeId: number
  isOpen: boolean
  onClose: () => void
}

export const UpdateEquipmentModal: React.FC<Props> = ({
  locationId,
  locationTypeId,
  isOpen,
  onClose,
}) => {
  const {
    fetchEquipment,
    handleUpdateEquipment,
    isLoadingEquipment,
    isLoadingUpdateEquipment,
    register,
    errors,
    isActive,
    handleActiveChange,
  } = useUpdateEquipment({
    locationId,
    locationTypeId,
  })

  useEffect(() => {
    if (isOpen) {
      fetchEquipment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar equipamento"
      onSubmit={handleUpdateEquipment(onClose)}
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
            isLoading={isLoadingUpdateEquipment}
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
            register={register}
            isLoading={isLoadingEquipment}
          />
        </div>
        <Input
          placeholder="Modelo"
          name="modelo"
          formError={errors.modelo?.message}
          register={register}
          isLoading={isLoadingEquipment}
        />
        <Input
          placeholder="Placa"
          name="placa"
          formError={errors.placa?.message}
          register={register}
          isLoading={isLoadingEquipment}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder="Tag"
            name="tag"
            formError={errors.tag?.message}
            register={register}
            isLoading={isLoadingEquipment}
          />
        </div>
        <Input
          placeholder="Nome do responsável"
          name="responsavelnome"
          formError={errors.responsavelnome?.message}
          register={register}
          isLoading={isLoadingEquipment}
        />
        <Input
          placeholder="Email do responsável"
          type="email"
          name="responsavelemail"
          formError={errors.responsavelemail?.message}
          register={register}
          isLoading={isLoadingEquipment}
        />
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se o equipamento está ativo ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
            isLoading={isLoadingEquipment}
          />
        </div>
      </div>
    </Modal>
  )
}
