import { Fragment, useEffect } from 'react'

import { useUpdateArea } from '@/hooks/location/useUpdateArea'

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

export const UpdateAreaModal: React.FC<Props> = ({
  locationId,
  locationTypeId,
  isOpen,
  onClose,
}) => {
  const {
    fetchArea,
    handleUpdateArea,
    isLoadingArea,
    isLoadingUpdateArea,
    register,
    errors,
    isActive,
    handleActiveChange,
  } = useUpdateArea({
    locationId,
    locationTypeId,
  })

  useEffect(() => {
    if (isOpen) {
      fetchArea()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar área"
      onSubmit={handleUpdateArea(onClose)}
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
            type="submit"
            additionalClasses="w-44 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingUpdateArea}
            isDisabled={isLoadingArea}
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
            isLoading={isLoadingArea}
          />
        </div>
        <Input
          placeholder="Nome do responsável"
          name="responsavelnome"
          formError={errors.responsavelnome?.message}
          register={register}
          isLoading={isLoadingArea}
        />
        <Input
          placeholder="Email do responsável"
          type="email"
          name="responsavelemail"
          formError={errors.responsavelemail?.message}
          register={register}
          isLoading={isLoadingArea}
        />
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se a área está ativa ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
            isLoading={isLoadingArea}
          />
        </div>
      </div>
    </Modal>
  )
}
