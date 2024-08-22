import { Fragment, useEffect } from 'react'
import Image from 'next/image'

import { useUpdateClient } from '@/hooks/client/useUpdateClient'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  clientId: number
  isOpen: boolean
  onClose: () => void
}

export const UpdateClientModal: React.FC<Props> = ({
  clientId,
  isOpen,
  onClose,
}) => {
  const {
    fetchClient,
    handleUpdateClient,
    isLoadingClient,
    isLoadingUpdateClient,
    register,
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
  } = useUpdateClient(clientId)

  useEffect(() => {
    if (isOpen) {
      fetchClient()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar cliente"
      onSubmit={handleUpdateClient(onClose)}
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
            type="submit"
            additionalClasses="w-44 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingUpdateClient}
            isDisabled={isLoadingClient}
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
            isLoading={isLoadingClient}
          />
        </div>
        <Input
          placeholder={'CNPJ'}
          formError={errors.cpnj?.message}
          name="cpnj"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'Razão Social'}
          formError={errors.razaosocial?.message}
          name="razaosocial"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'Rua'}
          formError={errors.rua?.message}
          name="rua"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'Número'}
          formError={errors.numero?.message}
          name="numero"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <div className="col-span-1 sm:col-span-2">
          <Input
            placeholder={'Complemento'}
            formError={errors.complemento?.message}
            name="complemento"
            autoFocus
            register={register}
            isLoading={isLoadingClient}
          />
        </div>
        <Input
          placeholder={'Bairro'}
          formError={errors.bairro?.message}
          name="bairro"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'CEP'}
          formError={errors.cep?.message}
          name="cep"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'Estado'}
          formError={errors.estado?.message}
          name="estado"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <Input
          placeholder={'Cidade'}
          formError={errors.cidade?.message}
          name="cidade"
          autoFocus
          register={register}
          isLoading={isLoadingClient}
        />
        <div>
          <label className="text-gray-700 text-md font-semibold mb-1">
            Ícone do cliente
          </label>
          <div
            className="mt-2 w-40 h-40 cursor-pointer"
            onClick={handleIconContainerClick}
          >
            {isLoadingClient ? (
              <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
            ) : previewIcon ? (
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
          <label className="text-gray-700 text-md font-semibold">
            Logo do cliente
          </label>
          <div
            className="mt-2 w-40 h-40 cursor-pointer"
            onClick={handleLogoContainerClick}
          >
            {isLoadingClient ? (
              <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
            ) : previewLogo ? (
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
            isLoading={isLoadingClient}
          />
        </div>
      </div>
    </Modal>
  )
}
