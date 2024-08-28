import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { logout } from '@/query/auth/logout'

import { Routes } from '@/enums/Routes'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: logoutFn, isPending: isLoadingLogout } = useMutation({
    mutationFn: logout,
  })

  const handleLogout = useCallback(async () => {
    try {
      await logoutFn()
      await router.push(Routes.LOGIN)
      queryClient.invalidateQueries()
    } catch (error) {
      toast.error('Não foi possível sair da sua conta.')
    }
  }, [logoutFn, queryClient, router])

  return {
    handleLogout,
    isLoadingLogout,
  }
}
