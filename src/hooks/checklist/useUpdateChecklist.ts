import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ChecklistRepository } from '@/infrastructure/repositories/ChecklistRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const checklistRepository = new ChecklistRepository(baseRepository)

export const useUpdateChecklist = (checklistId: number) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getChecklistByIdFn, isPending: isLoadingChecklist } =
    useMutation({
      mutationKey: [QueryKey.GET_CHECKLIST_BY_ID, checklistId],
      mutationFn: checklistRepository.getById,
    })

  const {
    mutateAsync: updateChecklistFn,
    isPending: isLoadingUpdateChecklist,
  } = useMutation({
    mutationFn: checklistRepository.update,
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

  const updateChecklist = useCallback(
    async (data: TUpdateChecklistParams) => {
      try {
        await updateChecklistFn(data)
        toast.success('Checklist atualizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CHECKLIST_BY_ID, checklistId],
        })
      } catch (error) {
        toast.error('Não foi possível atualizar o checklist.')
      }
    },
    [updateChecklistFn, queryClient, checklistId],
  )

  return {
    fetchChecklist,
    updateChecklist,
    isLoadingChecklist,
    isLoadingUpdateChecklist,
  }
}
