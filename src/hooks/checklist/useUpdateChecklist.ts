import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/auth/useAuth'

import { getChecklistById } from '@/query/checklist/getChecklistById'
import { updateChecklist } from '@/query/checklist/updateChecklist'

import { QueryKey } from '@/enums/QueryKey'

export const useUpdateChecklist = (checklistId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getChecklistByIdFn, isPending: isLoadingChecklist } =
    useMutation({
      mutationFn: getChecklistById,
    })

  const {
    mutateAsync: updateChecklistFn,
    isPending: isLoadingUpdateChecklist,
  } = useMutation({
    mutationFn: updateChecklist,
  })

  const fetchChecklist = useCallback(async () => {
    try {
      const checklist = await getChecklistByIdFn({
        idchecklist: checklistId,
        idclient: clientId,
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do checklist.')
    }
  }, [checklistId, clientId, getChecklistByIdFn])

  const onSubmit = useCallback(
    async (data: TUpdateChecklistParams) => {
      try {
        await updateChecklistFn(data)
        toast.success('Checklist editado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
      } catch (error) {
        toast.error('Não foi possível editar o checklist.')
      }
    },
    [updateChecklistFn, queryClient],
  )

  return {
    fetchChecklist,
    handleUpdateChecklist: onSubmit,
    isLoadingChecklist,
    isLoadingUpdateChecklist,
  }
}
