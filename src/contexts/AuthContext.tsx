import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { TokenService } from '@/services/TokenService'

import { getAuth } from '@/query/auth/getAuth'
import { updatePassword } from '@/query/auth/updatePassword'

import { Routes } from '@/enums/Routes'
import { QueryKey } from '@/enums/QueryKey'

export type TAuthContextDataProps = {
  auth: TAuth | null
  userId: number
  clientId: number
  isLoadingUpdatePassword: boolean
  isLoadingUser: boolean
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

  const { mutateAsync: updatePasswordFn, isPending: isLoadingUpdatePassword } =
    useMutation({
      mutationFn: updatePassword,
    })

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
      isLoadingUpdatePassword,
      isLoadingUser,
      handleUpdatePassword,
    }),
    [auth, isLoadingUpdatePassword, isLoadingUser, handleUpdatePassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
