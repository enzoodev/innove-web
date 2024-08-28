import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  updatePasswordSchema,
  TUpdatePasswordSchema,
} from '@/schemas/auth/updatePasswordSchema'

import { updatePassword } from '@/query/auth/updatePassword'

export const useUpdatePassword = () => {
  const router = useRouter()

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: updatePassword,
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const password = watch('password')

  const onSubmit = useCallback(
    async (data: TUpdatePasswordSchema) => {
      try {
        await updatePasswordFn({
          newpass: data.password,
        })
        router.back()
        toast.success('Senha alterada com sucesso!')
        reset()
      } catch (error) {
        toast.error('Não foi possível alterar sua senha.')
      }
    },
    [updatePasswordFn, reset, router],
  )

  const handleUpdatePassword = handleSubmit(onSubmit)

  return {
    register,
    errors,
    password,
    handleUpdatePassword,
    isLoadingUpdatePassword,
  }
}
