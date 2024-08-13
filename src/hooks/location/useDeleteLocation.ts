import { useCallback, useMemo } from 'react'
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

type UseDeleteLocation = TDeleteLocationParams & {
  local: TLocationTypeKey
}

export const useDeleteLocation = ({ local, ...params }: UseDeleteLocation) => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteLocationFn, isPending: isLoadingDeleteLocation } =
    useMutation({
      mutationFn: locationRepository.delete,
    })

  const getLocationDetailsQueryKeysToInvalidate: Record<
    TLocationTypeKey,
    QueryKey
  > = useMemo(
    () => ({
      Obra: QueryKey.GET_CONSTRUCTION_BY_ID,
      Area: QueryKey.GET_AREA_BY_ID,
      Equipamento: QueryKey.GET_EQUIPMENT_BY_ID,
    }),
    [],
  )

  const deleteLocation = useCallback(
    async (data: TDeleteLocationParams) => {
      try {
        await deleteLocationFn(data)
        toast.success('Inspeção excluida com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })

        const queryKeyToInvalidate =
          getLocationDetailsQueryKeysToInvalidate[local]
        queryClient.invalidateQueries({
          queryKey: [queryKeyToInvalidate, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível excluir a inspeção.')
      }
    },
    [
      deleteLocationFn,
      queryClient,
      getLocationDetailsQueryKeysToInvalidate,
      local,
      params.idlocal,
    ],
  )

  return {
    deleteLocation,
    isLoadingDeleteLocation,
  }
}
