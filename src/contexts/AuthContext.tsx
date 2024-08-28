import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { TokenService } from '@/services/TokenService'

import { getAuth } from '@/query/auth/getAuth'
import { recoverAccount } from '@/query/auth/recoverAccount'
import { updatePassword } from '@/query/auth/updatePassword'

import { Routes } from '@/enums/Routes'
import { QueryKey } from '@/enums/QueryKey'

export type TAuthContextDataProps = {
  auth: TAuth | null
  userId: number
  clientId: number
  isLoadingRecoverAccount: boolean
  isLoadingUpdatePassword: boolean
  isLoadingUser: boolean
  handleRecoverAccount: (params: TRecoverAccountParams) => Promise<void>
  handleUpdatePassword: (params: TUpdatePasswordParams) => Promise<void>
}

type TAuthContextProviderProps = {
  readonly children: ReactNode
}

export const AuthContext = React.createContext<TAuthContextDataProps>(
  {} as TAuthContextDataProps,
)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const router = useRouter()

  const { data: auth, isFetching: isLoadingUser } = useQuery({
    queryKey: [QueryKey.GET_USER],
    queryFn: async () => {
      try {
        return await getAuth()
      } catch (error) {
        toast.error('Não foi possível buscar seus dados.')
        throw error
      }
    },
  })

  const { mutateAsync: recoverAccountFn, isPending: isLoadingRecoverAccount } =
    useMutation({
      mutationFn: recoverAccount,
    })

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: updatePassword,
    })

  const handleRecoverAccount = useCallback(
    async (params: TRecoverAccountParams) => {
      try {
        await recoverAccountFn(params)
        toast.success('Email enviado com sucesso!')
        router.push(Routes.LOGIN)
      } catch (error) {
        toast.error('Não foi possível recuperar sua conta.')
      }
    },
    [recoverAccountFn, router],
  )

  const handleUpdatePassword = useCallback(
    async (params: TUpdatePasswordParams) => {
      try {
        await updatePasswordFn(params)
        toast.success('Senha alterada com sucesso!')
        router.push(Routes.CONFIG)
      } catch (error) {
        toast.error('Não foi possível alterar sua senha.')
      }
    },
    [updatePasswordFn, router],
  )

  const authRoutes: Array<string> = useMemo(() => {
    return [Routes.LOGIN, Routes.RECOVER_ACCOUNT]
  }, [])

  useEffect(() => {
    const hasToken = TokenService.has()
    const isInAuthRoutes = authRoutes.includes(router.pathname)

    if (hasToken) {
      if (isInAuthRoutes) {
        router.push(Routes.CLIENTS)
      }

      return
    }

    if (!isInAuthRoutes) {
      router.push(Routes.LOGIN)
    }
  }, [auth, authRoutes, router])

  const value: TAuthContextDataProps = useMemo(
    () => ({
      auth: auth ?? null,
      clientId: auth?.idclient ?? 0,
      userId: auth?.iduser ?? 0,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      isLoadingUser,
      handleRecoverAccount,
      handleUpdatePassword,
    }),
    [
      auth,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      isLoadingUser,
      handleRecoverAccount,
      handleUpdatePassword,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
