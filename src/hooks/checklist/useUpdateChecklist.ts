import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveChecklistSchema,
  TSaveChecklistSchema,
} from '@/schemas/checklist/saveChecklistSchema'

import { getChecklistById } from '@/query/checklist/getChecklistById'
import { updateChecklist } from '@/query/checklist/updateChecklist'

import { QueryKey } from '@/enums/QueryKey'

import { generateId } from '@/utils/generateId'

export const useUpdateChecklist = (checklistId: number) => {
  const { clientId } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
    control,
  } = useForm<TSaveChecklistSchema>({
    resolver: zodResolver(saveChecklistSchema),
    defaultValues: {
      name: '',
      type: '',
      status: true,
      sections: [],
    },
  })

  const isActive = watch('status')
  const sections = watch('sections')

  const { data: checklist, isFetching: isLoadingChecklist } = useQuery({
    enabled: !!clientId,
    queryKey: [QueryKey.GET_CHECKLIST_BY_ID, { checklistId }],
    queryFn: async () => {
      try {
        const response = await getChecklistById({
          idchecklist: checklistId,
          idclient: clientId,
        })

        reset({
          name: response.name,
          // type: response.tipochecklist,
          // status: response.ativo === '1',
          sections: response.topics.map((section) => ({
            id: generateId(),
            title: section.subtitle,
            isEditing: false,
            isOpen: false,
            items: section.questions.map((question) => ({
              id: generateId(),
              questionId: question.idquestion,
              name: question.name,
              status: question.ativo === '1',
            })),
          })),
        })

        return response
      } catch (error) {
        toast.error('Não foi possível buscar os dados do checklist.')
        throw error
      }
    },
  })

  const {
    mutateAsync: updateChecklistFn,
    isPending: isLoadingUpdateChecklist,
  } = useMutation({
    mutationFn: updateChecklist,
  })

  const handleValidadeSections = useCallback(async () => {
    const isValid = await trigger(`sections`)

    if (!isValid) {
      toast.error(
        'Preencha os títulos de todos os tópicos e adicione pelo menos uma questão em cada tópico.',
        { autoClose: 6000 },
      )
    }

    return isValid
  }, [trigger])

  const handleActiveChange = useCallback(() => {
    setValue('status', !isActive)
  }, [setValue, isActive])

  const handleToggleEditSectionTitle = useCallback(
    (index: number) => {
      setValue(`sections.${index}.isEditing`, !sections[index].isEditing)
    },
    [sections, setValue],
  )

  const handleResetSection = useCallback(
    (index: number) => {
      if (!checklist) return

      setValue(`sections.${index}.isEditing`, false)
      setValue(`sections.${index}.title`, checklist?.topics[index].subtitle)
      setValue(
        `sections.${index}.items`,
        checklist?.topics[index].questions.map((question) => ({
          id:
            sections[index].items.find(
              (item) => item.questionId === question.idquestion,
            )?.id ?? generateId(),
          questionId: question.idquestion,
          name: question.name,
          status: question.ativo === '1',
        })),
      )
    },
    [checklist, sections, setValue],
  )

  const handleDoneEditingSectionTitle = useCallback(
    async (index: number) => {
      try {
        const isValid = await trigger(`sections.${index}.title`)
        if (isValid) {
          setValue(`sections.${index}.isEditing`, false)
        }
      } catch (error) {
        toast.error('Não foi possível salvar o título do tópico.')
      }
    },
    [setValue, trigger],
  )

  const openSection = useCallback(
    (index: number) => {
      sections.forEach((_, sectionIndex) => {
        setValue(`sections.${sectionIndex}.isOpen`, sectionIndex === index)
        setValue(`sections.${sectionIndex}.isEditing`, false)
      })
    },
    [sections, setValue],
  )

  const handleOpenSection = useCallback(
    async (index: number) => {
      const isValid = await handleValidadeSections()
      if (isValid) {
        openSection(index)
      }
    },
    [handleValidadeSections, openSection],
  )

  const handleAddSection = useCallback(async () => {
    try {
      if (sections.length > 0) {
        const isValid = await handleValidadeSections()
        if (!isValid) return
      }

      setValue(`sections`, [
        ...sections,
        {
          id: generateId(),
          title: '',
          isEditing: true,
          isOpen: true,
          items: [],
        },
      ])
      openSection(sections.length)
    } catch (error) {
      toast.error('Não foi possível adicionar um tópico.')
    }
  }, [handleValidadeSections, openSection, sections, setValue])

  const handleDeleteSection = useCallback(
    (index: number) => {
      const nextIndex = index === 0 ? 0 : index - 1
      setValue(
        `sections`,
        sections.filter((_, i) => i !== index),
      )
      handleOpenSection(nextIndex)
    },
    [setValue, sections, handleOpenSection],
  )

  const handleAddQuestion = useCallback(
    (sectionIndex: number) => {
      setValue(`sections.${sectionIndex}.items`, [
        ...sections[sectionIndex].items,
        { id: generateId(), questionId: '', name: '', status: true },
      ])
    },
    [sections, setValue],
  )

  const handleDeleteQuestion = useCallback(
    (sectionIndex: number, questionId: string) => {
      const filteredSections = sections[sectionIndex].items.filter(
        (item) => item.id !== questionId,
      )
      setValue(`sections.${sectionIndex}.items`, filteredSections)
    },
    [sections, setValue],
  )

  const onSubmit = useCallback(
    async (data: TSaveChecklistSchema) => {
      try {
        const dataToRequest: TUpdateChecklistParams = {
          idchecklist: checklistId.toString(),
          idclient: clientId.toString(),
          name: data.name,
          tipochecklist: data.type,
          ativo: data.status ? '1' : '0',
          questions: data.sections.flatMap((section) =>
            section.items.map((question) => ({
              idquestion: question.questionId,
              subtitle: section.title,
              name: question.name,
              ativo: question.status ? '1' : '0',
            })),
          ),
        }

        await updateChecklistFn(dataToRequest)
        router.back()
        toast.success('Checklist cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CHECKLIST_BY_ID, { checklistId }],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar o checklist.')
      }
    },
    [checklistId, clientId, updateChecklistFn, router, queryClient, reset],
  )

  const handleUpdateChecklist = handleSubmit(onSubmit)

  return {
    handleUpdateChecklist,
    isLoadingUpdateChecklist,
    isLoadingChecklist,
    errors,
    control,
    sections,
    isActive,
    handleActiveChange,
    handleToggleEditSectionTitle,
    handleDoneEditingSectionTitle,
    handleOpenSection,
    handleAddSection,
    handleDeleteSection,
    handleAddQuestion,
    handleDeleteQuestion,
    handleResetSection,
  }
}
