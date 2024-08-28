import { Fragment } from 'react'
import { Controller } from 'react-hook-form'

import { useCreateConstruction } from '@/hooks/location/useCreateConstruction'

import { cnpjMask } from '@/utils/constants/masks/cnpjMask'
import { dateMask } from '@/utils/constants/masks/dateMask'
import { cepMask } from '@/utils/constants/masks/cepMask'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'
import { MaskInput } from '@/components/elements/MaskInput'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateConstructionModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const {
    handleCreateConstruction,
    isLoadingCreateConstruction,
    register,
    errors,
    control,
    isActive,
    handleActiveChange,
  } = useCreateConstruction()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar obra"
      onSubmit={handleCreateConstruction(onClose)}
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
            isLoading={isLoadingCreateConstruction}
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
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Razão Social'}
            formError={errors.razaosocial?.message}
            name="razaosocial"
            register={register}
          />
        </div>
        <Controller
          control={control}
          name="cnpj"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              placeholder={'CNPJ'}
              formError={errors.cnpj?.message}
              onChange={onChange}
              value={value}
              mask={cnpjMask}
            />
          )}
        />
        <Controller
          control={control}
          name="datastart"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              placeholder={'Data de início'}
              formError={errors.datastart?.message}
              onChange={onChange}
              value={value}
              mask={dateMask}
            />
          )}
        />
        <Input
          placeholder={'Rua'}
          formError={errors.rua?.message}
          name="rua"
          register={register}
        />
        <Input
          placeholder={'Número'}
          formError={errors.numero?.message}
          name="numero"
          register={register}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Complemento'}
            formError={errors.complemento?.message}
            name="complemento"
            register={register}
          />
        </div>
        <Input
          placeholder={'Bairro'}
          formError={errors.bairro?.message}
          name="bairro"
          register={register}
        />
        <Controller
          control={control}
          name="cep"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              placeholder={'CEP'}
              formError={errors.cep?.message}
              onChange={onChange}
              value={value}
              mask={cepMask}
            />
          )}
        />
        <Input
          placeholder={'Estado'}
          formError={errors.estado?.message}
          name="estado"
          register={register}
        />
        <Input
          placeholder={'Cidade'}
          formError={errors.cidade?.message}
          name="cidade"
          register={register}
        />
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
            description="Defina se a obra está ativa ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
          />
        </div>
      </div>
    </Modal>
  )
}
