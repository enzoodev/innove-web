import { Fragment, useEffect } from 'react'

import { useUpdateUser } from '@/hooks/user/useUpdateUser'

import { phoneMasks } from '@/utils/constants/masks/phoneMasks'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { CheckboxGroup } from '@/components/elements/CheckboxGroup'
import { Checkbox } from '@/components/elements/Checkbox'

type Props = {
  userId: number
  isOpen: boolean
  onClose: () => void
}

export const UpdateUserModal: React.FC<Props> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const {
    fetchUser,
    handleUpdateUser,
    isLoadingUser,
    isLoadingUpdateUser,
    register,
    registerWithMask,
    errors,
    userIsActive,
    userPermissions,
    handleUserActiveChange,
    handlePermissionChange,
  } = useUpdateUser(userId)

  useEffect(() => {
    if (isOpen) {
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar usuário"
      onSubmit={handleUpdateUser(onClose)}
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
            isLoading={isLoadingUpdateUser}
            isDisabled={isLoadingUser}
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
            isLoading={isLoadingUser}
          />
        </div>
        <Input
          placeholder="Telefone"
          formError={errors.telefone?.message}
          name="telefone"
          autoFocus
          register={registerWithMask}
          masks={phoneMasks}
          isLoading={isLoadingUser}
        />
        <Input
          placeholder="Email"
          type="email"
          formError={errors.email?.message}
          name="email"
          autoFocus
          register={register}
          isLoading={isLoadingUser}
        />
        <div className="col-span-1 sm:col-span-2">
          <CheckboxGroup
            placeholder="Permissões"
            options={userPermissions}
            onSelectItem={handlePermissionChange}
            formError={errors.permission?.message}
            isLoading={isLoadingUser}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Checkbox
            label="Status"
            description="Defina se o usuário está ativo ou não."
            checked={userIsActive}
            onChange={handleUserActiveChange}
            formError={errors.ativo?.message}
            isLoading={isLoadingUser}
          />
        </div>
      </div>
    </Modal>
  )
}
