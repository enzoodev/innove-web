import { useMemo } from 'react'
import { NextPage } from 'next'
import { IconCheck, IconLockPassword } from '@tabler/icons-react'

import { useUpdatePassword } from '@/hooks/auth/useUpdatePassword'

import { passwordRules } from '@/schemas/auth/updatePasswordSchema'

import { generateId } from '@/utils/generateId'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Button } from '@/components/elements/Button'
import { PasswordInput } from '@/components/elements/PasswordInput'

const UpdatePassword: NextPage = () => {
  const {
    register,
    errors,
    password,
    handleUpdatePassword,
    isLoadingUpdatePassword,
  } = useUpdatePassword()

  const rules = useMemo(
    () =>
      passwordRules.map((item) => ({
        message: item.message,
        isSatisfied: item.regex.test(password),
      })),
    [password],
  )

  return (
    <LayoutApp headTitle="Alterar senha - Innove" hasHeader={false}>
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-4 rounded w-11/12 max-w-96 border border-gray-300 bg-gray-100 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          <div className="flex flex-col gap-2 items-center mb-4">
            <IconLockPassword
              stroke={1.25}
              className="text-gray-700 h-28 w-28"
            />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-gray-700 text-xl text-center font-semibold">
                Alterar senha
              </h1>
              <span className="text-gray-600 text-sm text-center">
                Digite sua nova senha conforme as regras abaixo
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-3 w-full">
            {rules.map((item) => (
              <div key={generateId()} className="flex flex-row gap-1">
                <IconCheck
                  stroke={2}
                  className={`w-5 h-5 ${
                    item.isSatisfied ? 'text-green-600' : 'text-gray-600'
                  }`}
                />
                <span
                  className={`text-xs flex-1 ${
                    item.isSatisfied ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {item.message}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleUpdatePassword}
            className="flex flex-col gap-4 w-full"
          >
            <PasswordInput
              placeholder="Senha"
              formError={errors.password?.message}
              name="password"
              register={register}
            />
            <PasswordInput
              placeholder="Confirmação de senha"
              formError={errors.passwordConfirmation?.message}
              name="passwordConfirmation"
              register={register}
            />
            <Button
              title="Enviar"
              type="submit"
              additionalClasses="w-full mt-2 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
              isLoading={isLoadingUpdatePassword}
            />
          </form>
        </div>
      </div>
    </LayoutApp>
  )
}

export default UpdatePassword
