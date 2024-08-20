import { Fragment } from 'react'

import { useCreateUser } from '@/hooks/user/useCreateUser'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { CheckboxGroup } from '@/components/elements/CheckboxGroup'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleCreateUser,
    isLoadingCreateUser,
    register,
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
            autoFocus
            register={register}
          />
        </div>
        <Input
          placeholder="Telefone"
          formError={errors.telefone?.message}
          name="telefone"
          autoFocus
          register={register}
        />
        <Input
          placeholder="Email"
          type="email"
          formError={errors.email?.message}
          name="email"
          autoFocus
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
