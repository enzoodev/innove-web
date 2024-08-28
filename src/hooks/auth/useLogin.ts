import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { loginSchema, TLoginSchema } from '@/schemas/auth/loginSchema'

import { login } from '@/query/auth/login'

import { QueryKey } from '@/enums/QueryKey'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: loginFn, isPending: isLoadingLogin } = useMutation({
    mutationFn: login,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<TLoginSchema> = useCallback(
    async (data) => {
      try {
        await loginFn({
          login: data.login,
          pass: data.password,
          devicetype: '1',
        })
        toast.success('Login realizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USER] })
      } catch (error) {
        toast.error('Não foi possível entrar na sua conta.')
      }
    },
    [loginFn, queryClient],
  )

  const handleLogin = handleSubmit(onSubmit)

  return {
    register,
    handleLogin,
    errors,
    isLoadingLogin,
  }
}
