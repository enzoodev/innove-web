import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ChecklistRepository } from '@/infrastructure/repositories/ChecklistRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const checklistRepository = new ChecklistRepository(baseRepository)

export const useCreateChecklist = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createChecklistFn,
    isPending: isLoadingCreateChecklist,
  } = useMutation({
    mutationFn: checklistRepository.create,
  })

  const createChecklist = useCallback(
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
    createChecklist,
    isLoadingCreateChecklist,
  }
}
