import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ChecklistRepository } from '@/infrastructure/repositories/ChecklistRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const checklistRepository = new ChecklistRepository(baseRepository)

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
    mutationFn: checklistRepository.inactiveQuestion,
  })

  const inactiveQuestion = useCallback(async () => {
    try {
      await inactiveQuestionFn({
        idclient: clientId,
        idchecklist: checklistId,
        idquestion: questionId,
      })
      toast.success('Questão excluida com sucesso!')
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_CHECKLIST_BY_ID, checklistId],
      })
    } catch (error) {
      toast.error('Não foi possível excluir a questão.')
    }
  }, [checklistId, clientId, inactiveQuestionFn, queryClient, questionId])

  return {
    inactiveQuestion,
    isLoadingInactiveQuestion,
  }
}
