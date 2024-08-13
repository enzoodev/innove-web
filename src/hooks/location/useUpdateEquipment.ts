import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LocationRepository } from '@/infrastructure/repositories/LocationRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const locationRepository = new LocationRepository(baseRepository)

export const useUpdateEquipment = (params: TGetLocationParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getEquipmentFn, isPending: isLoadingEquipment } =
    useMutation({
      mutationKey: [QueryKey.GET_EQUIPMENT_BY_ID, params.idlocal],
      mutationFn: locationRepository.getEquipment,
    })

  const {
    mutateAsync: updateEquipmentFn,
    isPending: isLoadingUpdateEquipment,
  } = useMutation({
    mutationFn: locationRepository.updateEquipment,
  })

  const fetchEquipment = useCallback(async () => {
    try {
      const equipment = await getEquipmentFn(params)
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getEquipmentFn, params])

  const updateEquipment = useCallback(
    async (data: TUpdateEquipmentParams) => {
      try {
        await updateEquipmentFn(data)
        toast.success('Inspeção atualizada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_EQUIPMENT_BY_ID, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar a inspeção.')
      }
    },
    [updateEquipmentFn, queryClient, params.idlocal],
  )

  return {
    fetchEquipment,
    updateEquipment,
    isLoadingEquipment,
    isLoadingUpdateEquipment,
  }
}
