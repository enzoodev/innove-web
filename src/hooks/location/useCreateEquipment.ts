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

export const useCreateEquipment = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createEquipmentFn,
    isPending: isLoadingCreateEquipment,
  } = useMutation({
    mutationFn: locationRepository.createEquipment,
  })

  const createEquipment = useCallback(
    async (data: TCreateEquipmentParams) => {
      try {
        await createEquipmentFn(data)
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [createEquipmentFn, queryClient],
  )

  return {
    createEquipment,
    isLoadingCreateEquipment,
  }
}
