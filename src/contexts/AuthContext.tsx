import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AuthRepository } from '@/infrastructure/repositories/AuthRepository'
import { createHttpService } from '@/infrastructure/dependencies/HttpServiceFactory'
import { TokenRepository } from '@/infrastructure/repositories/TokenRepository'
import { EncryptionService } from '@/infrastructure/services/EncryptionService'
import { CookieService } from '@/infrastructure/services/CookieService'

import { useRefresh } from '@/hooks/useRefresh'
import { Routes } from '@/enums/Routes'

export type TAuthContextDataProps = {
  auth: TAuth | null
  userId: number
  clientId: number
  isAuthenticated: boolean
  isLoadingLogin: boolean
  isLoadingLogout: boolean
  isLoadingRecoverAccount: boolean
  isLoadingUpdatePassword: boolean
  isLoadingUser: boolean
  refreshUser: () => void
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

const httpServices = createHttpService()
const tokenRepository = new TokenRepository(
  new EncryptionService(),
  new CookieService(),
)
const authRepository = new AuthRepository(httpServices, tokenRepository)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const router = useRouter()
  const { key, refresh } = useRefresh()

  const { data: auth, isLoading: isLoadingUser } = useQuery({
    queryKey: ['get-user', key],
    queryFn: async () => {
      try {
        return await authRepository.getUser()
      } catch (error) {
        toast.error('Não foi possível buscar seus dados.')
        throw error
      }
    },
  })

  const isAuthenticated = !!auth

  const { mutateAsync: loginFn, isPending: isLoadingLogin } = useMutation({
    mutationFn: authRepository.login,
  })

  const { mutateAsync: logoutFn, isPending: isLoadingLogout } = useMutation({
    mutationFn: authRepository.logout,
  })

  const { mutateAsync: recoverAccountFn, isPending: isLoadingRecoverAccount } =
    useMutation({
      mutationFn: authRepository.recoverAccount,
    })

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: authRepository.updatePassword,
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
      router.push(Routes.LOGIN)
    } catch (error) {
      toast.error('Não foi possível sair da sua conta.')
    }
  }, [logoutFn, router])

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
      refreshUser: refresh,
      isAuthenticated,
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
      refresh,
      isAuthenticated,
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
