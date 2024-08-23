import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getAuth } from '@/query/auth/getAuth'
import { login } from '@/query/auth/login'
import { logout } from '@/query/auth/logout'
import { recoverAccount } from '@/query/auth/recoverAccount'
import { updatePassword } from '@/query/auth/updatePassword'

import { Routes } from '@/enums/Routes'
import { QueryKey } from '@/enums/QueryKey'

export type TAuthContextDataProps = {
  auth: TAuth | null
  userId: number
  clientId: number
  isLoadingLogin: boolean
  isLoadingLogout: boolean
  isLoadingRecoverAccount: boolean
  isLoadingUpdatePassword: boolean
  isLoadingUser: boolean
  handleLogin: (params: TLoginParams) => Promise<void>
  handleLogout: () => Promise<void>
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
  const queryClient = useQueryClient()

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

  const { mutateAsync: loginFn, isPending: isLoadingLogin } = useMutation({
    mutationFn: login,
  })

  const { mutateAsync: logoutFn, isPending: isLoadingLogout } = useMutation({
    mutationFn: logout,
  })

  const { mutateAsync: recoverAccountFn, isPending: isLoadingRecoverAccount } =
    useMutation({
      mutationFn: recoverAccount,
    })

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: updatePassword,
    })

  const handleLogin = useCallback(
    async (params: TLoginParams) => {
      try {
        await loginFn(params)
        toast.success('Login realizado com sucesso!')
        router.push(Routes.CLIENTS)
      } catch (error) {
        toast.error('Não foi possível entrar na sua conta.')
      }
    },
    [loginFn, router],
  )

  const handleLogout = useCallback(async () => {
    try {
      await logoutFn()
      queryClient.invalidateQueries()
      router.push(Routes.LOGIN)
    } catch (error) {
      toast.error('Não foi possível sair da sua conta.')
    }
  }, [logoutFn, queryClient, router])

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
        router.push(Routes.CLIENTS)
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
    const isLogged = auth?.iduser ?? false
    const isInAuthRoutes = authRoutes.includes(router.pathname)

    if (isLogged && isInAuthRoutes) {
      router.push(Routes.CLIENTS)
    }
  }, [auth, authRoutes, router])

  const value: TAuthContextDataProps = useMemo(
    () => ({
      auth: auth ?? null,
      clientId: auth?.idclient ?? 0,
      userId: auth?.iduser ?? 0,
      isLoadingLogin,
      isLoadingLogout,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      isLoadingUser,
      handleLogin,
      handleLogout,
      handleRecoverAccount,
      handleUpdatePassword,
    }),
    [
      auth,
      isLoadingLogin,
      isLoadingLogout,
      isLoadingRecoverAccount,
      isLoadingUpdatePassword,
      isLoadingUser,
      handleLogin,
      handleLogout,
      handleRecoverAccount,
      handleUpdatePassword,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
