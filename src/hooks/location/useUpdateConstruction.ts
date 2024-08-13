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

export const useUpdateConstruction = (params: TGetLocationParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getConstructionFn, isPending: isLoadingConstruction } =
    useMutation({
      mutationKey: [QueryKey.GET_CONSTRUCTION_BY_ID, params.idlocal],
      mutationFn: locationRepository.getConstruction,
    })

  const {
    mutateAsync: updateConstructionFn,
    isPending: isLoadingUpdateConstruction,
  } = useMutation({
    mutationFn: locationRepository.updateConstruction,
  })

  const fetchConstruction = useCallback(async () => {
    try {
      const construction = await getConstructionFn(params)
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getConstructionFn, params])

  const updateConstruction = useCallback(
    async (data: TUpdateConstructionParams) => {
      try {
        await updateConstructionFn(data)
        toast.success('Inspeção atualizada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CONSTRUCTION_BY_ID, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar a inspeção.')
      }
    },
    [updateConstructionFn, queryClient, params.idlocal],
  )

  return {
    fetchConstruction,
    updateConstruction,
    isLoadingConstruction,
    isLoadingUpdateConstruction,
  }
}
