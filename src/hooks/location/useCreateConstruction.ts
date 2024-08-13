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

export const useCreateConstruction = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createConstructionFn,
    isPending: isLoadingCreateConstruction,
  } = useMutation({
    mutationFn: locationRepository.createConstruction,
  })

  const createConstruction = useCallback(
    async (data: TCreateConstructionParams) => {
      try {
        await createConstructionFn(data)
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [createConstructionFn, queryClient],
  )

  return {
    createConstruction,
    isLoadingCreateConstruction,
  }
}
