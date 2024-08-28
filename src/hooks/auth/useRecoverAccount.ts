import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  recoverAccountSchema,
  TRecoverAccountSchema,
} from '@/schemas/auth/recoverAccountSchema'

import { recoverAccount } from '@/query/auth/recoverAccount'

import { Routes } from '@/enums/Routes'

export const useRecoverAccount = () => {
  const router = useRouter()

  const { mutateAsync: recoverAccountFn, isPending: isLoadingRecoverAccount } =
    useMutation({
      mutationFn: recoverAccount,
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRecoverAccountSchema>({
    resolver: zodResolver(recoverAccountSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = useCallback(
    async (data: TRecoverAccountSchema) => {
      try {
        await recoverAccountFn(data)
        toast.success('Email enviado com sucesso!')
        router.push(Routes.LOGIN)
      } catch (error) {
        toast.error('Não foi possível recuperar sua conta.')
      }
    },
    [recoverAccountFn, router],
  )

  const handleRecoverAccount = handleSubmit(onSubmit)

  return {
    register,
    errors,
    handleRecoverAccount,
    isLoadingRecoverAccount,
  }
}
