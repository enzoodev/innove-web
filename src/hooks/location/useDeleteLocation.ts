import { useCallback } from 'react'
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
      } catch (error) {
        toast.error('Não foi possível excluir a inspeção.')
      }
    },
    [deleteLocationFn, locationId, locationType.id, clientId, queryClient],
  )

  return {
    handleDeleteLocation,
    isLoadingDeleteLocation,
  }
}
