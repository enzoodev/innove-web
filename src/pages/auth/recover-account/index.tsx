import { NextPage } from 'next'
import { IconMail } from '@tabler/icons-react'

import { useRecoverAccount } from '@/hooks/auth/useRecoverAccount'

import { LayoutAuth } from '@/components/layout/LayoutAuth'
import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'

const RecoverAccount: NextPage = () => {
  const { register, errors, handleRecoverAccount, isLoadingRecoverAccount } =
    useRecoverAccount()

  return (
    <LayoutAuth headTitle="Recuperar acesso - Innove">
      <div className="w-96 p-4 flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 items-center">
          <IconMail stroke={1} className="text-gray-700 h-28 w-28" />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-gray-700 text-xl text-center font-semibold">
              Esqueceu a senha?
            </h1>
            <span className="text-gray-600 text-sm text-center">
              Escreva seu e-mail cadastrado abaixo para receber instruções de
              redefinição de senha
            </span>
          </div>
        </div>
        <form
          onSubmit={handleRecoverAccount}
          className="flex flex-col gap-4 items-center w-full"
        >
          <Input
            placeholder="Email"
            hasLabel={false}
            formError={errors.email?.message}
            name="email"
            register={register}
          />
          <Button
            title="Enviar"
            type="submit"
            additionalClasses="w-full mt-2 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingRecoverAccount}
          />
        </form>
      </div>
    </LayoutAuth>
  )
}

export default RecoverAccount
