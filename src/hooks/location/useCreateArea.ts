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

export const useCreateArea = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createAreaFn, isPending: isLoadingCreateArea } =
    useMutation({
      mutationFn: locationRepository.createArea,
    })

  const createArea = useCallback(
    async (data: TCreateAreaParams) => {
      try {
        await createAreaFn(data)
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [createAreaFn, queryClient],
  )

  return {
    createArea,
    isLoadingCreateArea,
  }
}
