import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createChecklist } from '@/query/checklist/createChecklist'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateChecklist = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createChecklistFn,
    isPending: isLoadingCreateChecklist,
  } = useMutation({
    mutationFn: createChecklist,
  })

  const onSubmit = useCallback(
    async (data: TCreateChecklistParams) => {
      try {
        await createChecklistFn(data)
        toast.success('Checklist cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
      } catch (error) {
        toast.error('Não foi possível cadastrar o checklist.')
      }
    },
    [createChecklistFn, queryClient],
  )

  return {
    createChecklist: onSubmit,
    isLoadingCreateChecklist,
  }
}
