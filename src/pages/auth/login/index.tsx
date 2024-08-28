import Link from 'next/link'
import { NextPage } from 'next'
import { IconUserCircle } from '@tabler/icons-react'

import { useLogin } from '@/hooks/auth/useLogin'

import { Routes } from '@/enums/Routes'

import { LayoutAuth } from '@/components/layout/LayoutAuth'
import { Input } from '@/components/elements/Input'
import { PasswordInput } from '@/components/elements/PasswordInput'
import { Button } from '@/components/elements/Button'

const Login: NextPage = () => {
  const { handleLogin, isLoadingLogin, errors, register } = useLogin()

  return (
    <LayoutAuth headTitle="Acessar o sistema Innove">
      <div className="w-96 p-4 flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 items-center">
          <IconUserCircle stroke={0.75} className="text-gray-700 h-24 w-24" />
          <h1 className="text-gray-700 text-xl text-center font-semibold">
            Acessar sistema Innove
          </h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 items-center w-full"
        >
          <Input
            placeholder={'Login'}
            hasLabel={false}
            formError={errors.login?.message}
            name="login"
            register={register}
          />
          <PasswordInput
            placeholder={'Senha'}
            hasLabel={false}
            formError={errors.password?.message}
            name="password"
            register={register}
          />
          <Button
            title="Entrar"
            type="submit"
            additionalClasses="w-full mt-2 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
            isLoading={isLoadingLogin}
          />
        </form>
        <Link href={Routes.RECOVER_ACCOUNT}>
          <span className="text-sm text-center underline text-gray-500 hover:text-gray-600 cursor-pointer">
            Esqueci minha senha
          </span>
        </Link>
      </div>
    </LayoutAuth>
  )
}

export default Login
