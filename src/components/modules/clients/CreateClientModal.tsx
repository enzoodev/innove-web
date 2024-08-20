import { Fragment } from 'react'

import { useCreateClient } from '@/hooks/client/useCreateClient'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'

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
      title="Cadastrar cliente"
      onSubmit={handleCreateClient(onClose)}
      dialogPanelClassName="max-w-2xl"
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
            isLoading={isLoadingCreateClient}
            type="submit"
          />
        </Fragment>
      }
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Nome'}
            formError={errors.name?.message}
            name="name"
            autoFocus
            register={register}
          />
        </div>
        <Input
          placeholder={'CNPJ'}
          formError={errors.cpnj?.message}
          name="cpnj"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'Razão Social'}
          formError={errors.razaosocial?.message}
          name="razaosocial"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'Rua'}
          formError={errors.rua?.message}
          name="rua"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'Número'}
          formError={errors.numero?.message}
          name="numero"
          autoFocus
          register={register}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Complemento'}
            formError={errors.complemento?.message}
            name="complemento"
            autoFocus
            register={register}
          />
        </div>
        <Input
          placeholder={'Bairro'}
          formError={errors.bairro?.message}
          name="bairro"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'CEP'}
          formError={errors.cep?.message}
          name="cep"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'Cidade'}
          formError={errors.cidade?.message}
          name="cidade"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'Estado'}
          formError={errors.estado?.message}
          name="estado"
          autoFocus
          register={register}
        />
        <div className="col-span-1 sm:col-span-2 flex items-center">
          <input type="checkbox" {...register('ativo')} />
          <label className="ml-2">Ativo</label>
        </div>
      </div>
    </Modal>
  )
}
