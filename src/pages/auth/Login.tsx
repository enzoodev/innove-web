import { useCallback } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Routes } from '@/enums/Routes'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, TLoginSchema } from '@/schemas/auth/loginSchema'

import { LayoutAuth } from '@/components/layout/LayoutAuth'
import { IconUserCircle } from '@tabler/icons-react'
import { FormError } from '@/components/elements/FormError'

const Login: NextPage = () => {
  const router = useRouter()
  const { handleLogin, isLoadingLogin } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const handleRecoverAccount = useCallback(() => {
    router.push(Routes.RECOVER_ACCOUNT)
  }, [router])

  const onSubmit: SubmitHandler<TLoginSchema> = useCallback(
    async (data) => {
      await handleLogin({
        login: data.login,
        pass: data.password,
        devicetype: '2',
      })
    },
    [handleLogin],
  )

  return (
    <LayoutAuth title="Acessar o sistema Innove">
      <div className="h-96 w-2/6 p-4 flex flex-col gap-6 items-center bg-blue-100">
        <div className="flex flex-col gap-2 items-center">
          <IconUserCircle stroke={0.75} className="text-gray-700 h-24 w-24" />
          <h1 className="text-gray-700 text-gray-800 text-xl font-semibold">
            Acessar sistema Innove
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="col-md-6">
            <input type="text" {...register('login')} placeholder="Login" />
            <FormError message={errors.login?.message} />
            <label className="label">Login</label>
          </div>
        </div>
      </div>
    </LayoutAuth>
  )
}

export default Login
