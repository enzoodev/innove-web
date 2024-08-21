import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createConstruction } from '@/query/location/createConstruction'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateConstruction = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createConstructionFn,
    isPending: isLoadingCreateConstruction,
  } = useMutation({
    mutationFn: createConstruction,
  })

  const onSubmit = useCallback(
    async (callback: () => void) => {
      try {
        await createConstructionFn({})
        callback()
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [createConstructionFn, queryClient],
  )

  return {
    handleCreateConstruction: onSubmit,
    isLoadingCreateConstruction,
  }
}
