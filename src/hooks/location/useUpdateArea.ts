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

export const useUpdateArea = (params: TGetLocationParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getAreaFn, isPending: isLoadingArea } = useMutation({
    mutationKey: [QueryKey.GET_AREA_BY_ID, params.idlocal],
    mutationFn: locationRepository.getArea,
  })

  const { mutateAsync: updateAreaFn, isPending: isLoadingUpdateArea } =
    useMutation({
      mutationFn: locationRepository.updateArea,
    })

  const fetchArea = useCallback(async () => {
    try {
      const area = await getAreaFn(params)
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getAreaFn, params])

  const updateArea = useCallback(
    async (data: TUpdateAreaParams) => {
      try {
        await updateAreaFn(data)
        toast.success('Inspeção atualizada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_AREA_BY_ID, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar a inspeção.')
      }
    },
    [updateAreaFn, queryClient, params.idlocal],
  )

  return {
    fetchArea,
    updateArea,
    isLoadingArea,
    isLoadingUpdateArea,
  }
}
