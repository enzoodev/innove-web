import { Fragment } from 'react'
import Image from 'next/image'

import { useCreateClient } from '@/hooks/client/useCreateClient'

import { cnpjMasks } from '@/utils/constants/masks/cnpjMasks'
import { cepMasks } from '@/utils/constants/masks/cepMasks'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateClientModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateClient,
    isLoadingCreateClient,
    register,
    registerWithMask,
    errors,
    handleFileIcon,
    handleFileLogo,
    isActive,
    handleActiveChange,
    iconInputRef,
    logoInputRef,
    previewIcon,
    previewLogo,
    handleIconContainerClick,
    handleLogoContainerClick,
  } = useCreateClient()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar cliente"
      onSubmit={handleCreateClient(onClose)}
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
          placeholder={'Razão Social'}
          formError={errors.razaosocial?.message}
          name="razaosocial"
          autoFocus
          register={register}
        />
        <Input
          placeholder={'CNPJ'}
          formError={errors.cpnj?.message}
          name="cpnj"
          autoFocus
          register={registerWithMask}
          masks={cnpjMasks}
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
          register={registerWithMask}
          masks={cepMasks}
        />
        <Input
          placeholder={'Estado'}
          formError={errors.estado?.message}
          name="estado"
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
        <div>
          <label className="text-gray-700 text-base font-semibold mb-1">
            Ícone do cliente
          </label>
          <div
            className="mt-2 w-40 h-40 cursor-pointer"
            onClick={handleIconContainerClick}
          >
            {previewIcon ? (
              <Image
                src={previewIcon}
                alt="Pré-visualização do ícone"
                width={160}
                height={160}
                className="rounded-full object-cover w-40 h-40"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-xs">
                  Nenhuma imagem
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileIcon}
            ref={iconInputRef}
            className="hidden"
          />
        </div>
        <div>
          <label className="text-gray-700 text-base font-semibold">
            Logo do cliente
          </label>
          <div
            className="mt-2 w-40 h-40 cursor-pointer"
            onClick={handleLogoContainerClick}
          >
            {previewLogo ? (
              <Image
                src={previewLogo}
                alt="Pré-visualização do logo"
                width={160}
                height={160}
                className="rounded-full object-cover w-40 h-40"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-xs">
                  Nenhuma imagem
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileLogo}
            ref={logoInputRef}
            className="hidden"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se o cliente está ativo ou não."
            checked={isActive}
            onChange={handleActiveChange}
            formError={errors.ativo?.message}
          />
        </div>
      </div>
    </Modal>
  )
}
