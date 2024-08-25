import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth/useAuth'

import { inactiveQuestion } from '@/query/checklist/inactiveQuestion'

import { QueryKey } from '@/enums/QueryKey'

export const useInactiveQuestion = (
  checklistId: number,
  questionId: number,
) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const {
    mutateAsync: inactiveQuestionFn,
    isPending: isLoadingInactiveQuestion,
  } = useMutation({
    mutationFn: inactiveQuestion,
  })

  const handleInativeQuestion = useCallback(async () => {
    try {
      await inactiveQuestionFn({
        idclient: clientId,
        idchecklist: checklistId,
        idquestion: questionId,
      })
      toast.success('Questão inativada com sucesso!')
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
    } catch (error) {
      toast.error('Não foi possível inativar a questão.')
    }
  }, [checklistId, clientId, inactiveQuestionFn, queryClient, questionId])

  return {
    handleInativeQuestion,
    isLoadingInactiveQuestion,
  }
}
