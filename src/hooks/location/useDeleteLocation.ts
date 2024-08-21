import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/auth/useAuth'

import { deleteLocation } from '@/query/location/deleteLocation'

import { QueryKey } from '@/enums/QueryKey'

type UseDeleteLocation = {
  locationId: number
  locationType: {
    id: number
    key: TLocationTypeKey
  }
}

export const useDeleteLocation = ({
  locationId,
  locationType,
}: UseDeleteLocation) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteLocationFn, isPending: isLoadingDeleteLocation } =
    useMutation({
      mutationFn: deleteLocation,
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

  const handleDeleteLocation = useCallback(
    async (callback: () => void) => {
      try {
        await deleteLocationFn({
          idlocal: locationId,
          idtipo: locationType.id,
          idclient: clientId,
        })
        callback()
        toast.success('Inspeção excluida com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })

        const queryKeyToInvalidate =
          getLocationDetailsQueryKeysToInvalidate[locationType.key]
        queryClient.invalidateQueries({
          queryKey: [queryKeyToInvalidate, locationId],
        })
      } catch (error) {
        toast.error('Não foi possível excluir a inspeção.')
      }
    },
    [
      deleteLocationFn,
      locationId,
      locationType.id,
      locationType.key,
      clientId,
      queryClient,
      getLocationDetailsQueryKeysToInvalidate,
    ],
  )

  return {
    handleDeleteLocation,
    isLoadingDeleteLocation,
  }
}
