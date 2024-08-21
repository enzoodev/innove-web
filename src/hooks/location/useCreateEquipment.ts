import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createEquipment } from '@/query/location/createEquipment'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateEquipment = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createEquipmentFn,
    isPending: isLoadingCreateEquipment,
  } = useMutation({
    mutationFn: createEquipment,
  })

  const onSubmit = useCallback(
    async (callback: () => void) => {
      try {
        await createEquipmentFn({})
        callback()
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [createEquipmentFn, queryClient],
  )

  return {
    createEquipment: onSubmit,
    isLoadingCreateEquipment,
  }
}
