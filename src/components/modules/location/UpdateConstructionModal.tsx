import { Fragment, useEffect } from 'react'

import { useUpdateConstruction } from '@/hooks/location/useUpdateConstruction'

import { cnpjMasks } from '@/utils/constants/masks/cnpjMasks'
import { dateMasks } from '@/utils/constants/masks/dateMasks'
import { cepMasks } from '@/utils/constants/masks/cepMasks'

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

export const UpdateConstructionModal: React.FC<Props> = ({
  locationId,
  locationTypeId,
  isOpen,
  onClose,
}) => {
  const {
    fetchConstruction,
    handleUpdateConstruction,
    isLoadingConstruction,
    isLoadingUpdateConstruction,
    register,
    registerWithMask,
    errors,
    isActive,
    handleActiveChange,
  } = useUpdateConstruction({
    locationId,
    locationTypeId,
  })

  useEffect(() => {
    if (isOpen) {
      fetchConstruction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar construção"
      onSubmit={handleUpdateConstruction(onClose)}
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
            isLoading={isLoadingUpdateConstruction}
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
            autoFocus
            register={register}
            isLoading={isLoadingConstruction}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Razão Social'}
            formError={errors.razaosocial?.message}
            name="razaosocial"
            autoFocus
            register={register}
            isLoading={isLoadingConstruction}
          />
        </div>
        <Input
          placeholder={'CNPJ'}
          formError={errors.cnpj?.message}
          name="cpnj"
          autoFocus
          register={registerWithMask}
          masks={cnpjMasks}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder="Data de início"
          formError={errors.datastart?.message}
          name="datastart"
          autoFocus
          register={registerWithMask}
          masks={dateMasks}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder={'Rua'}
          formError={errors.rua?.message}
          name="rua"
          autoFocus
          register={register}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder={'Número'}
          formError={errors.numero?.message}
          name="numero"
          autoFocus
          register={register}
          isLoading={isLoadingConstruction}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Complemento'}
            formError={errors.complemento?.message}
            name="complemento"
            autoFocus
            register={register}
            isLoading={isLoadingConstruction}
          />
        </div>
        <Input
          placeholder={'Bairro'}
          formError={errors.bairro?.message}
          name="bairro"
          autoFocus
          register={register}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder={'CEP'}
          formError={errors.cep?.message}
          name="cep"
          autoFocus
          register={registerWithMask}
          masks={cepMasks}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder={'Estado'}
          formError={errors.estado?.message}
          name="estado"
          autoFocus
          register={register}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder={'Cidade'}
          formError={errors.cidade?.message}
          name="cidade"
          autoFocus
          register={register}
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder="Nome do responsável"
          name="responsavelnome"
          formError={errors.responsavelnome?.message}
          register={register}
          autoFocus
          isLoading={isLoadingConstruction}
        />
        <Input
          placeholder="Email do responsável"
          type="email"
          name="responsavelemail"
          formError={errors.responsavelemail?.message}
          register={register}
          autoFocus
          isLoading={isLoadingConstruction}
        />
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se a construção está ativa ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
            isLoading={isLoadingConstruction}
          />
        </div>
      </div>
    </Modal>
  )
}
