import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getConstruction } from '@/query/location/getConstruction'
import { updateConstruction } from '@/query/location/updateConstruction'

import { QueryKey } from '@/enums/QueryKey'

export const useUpdateConstruction = (params: TGetLocationParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync: getConstructionFn, isPending: isLoadingConstruction } =
    useMutation({
      mutationKey: [QueryKey.GET_CONSTRUCTION_BY_ID, params.idlocal],
      mutationFn: getConstruction,
    })

  const {
    mutateAsync: updateConstructionFn,
    isPending: isLoadingUpdateConstruction,
  } = useMutation({
    mutationFn: updateConstruction,
  })

  const fetchConstruction = useCallback(async () => {
    try {
      const construction = await getConstructionFn(params)
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getConstructionFn, params])

  const onSubmit = useCallback(
    async (callback: () => void) => {
      try {
        await updateConstructionFn({})
        callback()
        toast.success('Inspeção editada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CONSTRUCTION_BY_ID, params.idlocal],
        })
      } catch (error) {
        toast.error('Não foi possível editar a inspeção.')
      }
    },
    [updateConstructionFn, queryClient, params.idlocal],
  )

  return {
    fetchConstruction,
    updateConstruction: onSubmit,
    isLoadingConstruction,
    isLoadingUpdateConstruction,
  }
}
