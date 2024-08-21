import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getEquipment } from '@/query/location/getEquipment'
import { updateEquipment } from '@/query/location/updateEquipment'

import { QueryKey } from '@/enums/QueryKey'

export const useUpdateEquipment = (params: TGetLocationParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getEquipmentFn, isPending: isLoadingEquipment } =
    useMutation({
      mutationKey: [QueryKey.GET_EQUIPMENT_BY_ID, params.idlocal],
      mutationFn: getEquipment,
    })

  const {
    mutateAsync: updateEquipmentFn,
    isPending: isLoadingUpdateEquipment,
  } = useMutation({
    mutationFn: updateEquipment,
  })

  const fetchEquipment = useCallback(async () => {
    try {
      const equipment = await getEquipmentFn(params)
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getEquipmentFn, params])

  const onSubmit = useCallback(
    async (callback: () => void) => {
      try {
        await updateEquipmentFn({})
        callback()
        toast.success('Inspeção editada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_EQUIPMENT_BY_ID, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível editar a inspeção.')
      }
    },
    [updateEquipmentFn, queryClient, params.idlocal],
  )

  return {
    fetchEquipment,
    updateEquipment: onSubmit,
    isLoadingEquipment,
    isLoadingUpdateEquipment,
  }
}
