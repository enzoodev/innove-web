import { Fragment } from 'react'
import { Controller } from 'react-hook-form'

import { useCreateUser } from '@/hooks/user/useCreateUser'

import { phoneMask } from '@/utils/constants/masks/phoneMask'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { CheckboxGroup } from '@/components/elements/CheckboxGroup'
import { Checkbox } from '@/components/elements/Checkbox'
import { MaskInput } from '@/components/elements/MaskInput'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateUser,
    isLoadingCreateUser,
    register,
    control,
    errors,
    userIsActive,
    userPermissions,
    handleUserActiveChange,
    handlePermissionChange,
  } = useCreateUser()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar usuário"
      onSubmit={handleCreateUser(onClose)}
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
            isLoading={isLoadingCreateUser}
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
        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, value } }) => (
            <MaskInput
              placeholder={'Telefone'}
              formError={errors.telefone?.message}
              onChange={onChange}
              value={value}
              mask={phoneMask}
            />
          )}
        />
        <Input
          placeholder="Email"
          type="email"
          formError={errors.email?.message}
          name="email"
          register={register}
        />
        <div className="col-span-1 sm:col-span-2">
          <CheckboxGroup
            placeholder="Permissões"
            options={userPermissions}
            onSelectItem={handlePermissionChange}
            formError={errors.permission?.message}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se o usuário está ativo ou não."
            checked={userIsActive}
            onChange={handleUserActiveChange}
            formError={errors.ativo?.message}
          />
        </div>
      </div>
    </Modal>
  )
}
