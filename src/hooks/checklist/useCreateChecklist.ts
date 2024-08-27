import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveChecklistSchema,
  TSaveChecklistSchema,
} from '@/schemas/checklist/saveChecklistSchema'

import { createChecklist } from '@/query/checklist/createChecklist'

import { QueryKey } from '@/enums/QueryKey'

import { generateId } from '@/utils/generateId'

export const useCreateChecklist = () => {
  const { clientId } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    mutateAsync: createChecklistFn,
    isPending: isLoadingCreateChecklist,
  } = useMutation({
    mutationFn: createChecklist,
  })

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
        const dataToRequest: TCreateChecklistParams = {
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

        await createChecklistFn(dataToRequest)
        router.back()
        toast.success('Checklist cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CHECKLISTS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível cadastrar o checklist.')
      }
    },
    [clientId, createChecklistFn, queryClient, reset, router],
  )

  const handleCreateChecklist = handleSubmit(onSubmit)

  return {
    handleCreateChecklist,
    isLoadingCreateChecklist,
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
  }
}
