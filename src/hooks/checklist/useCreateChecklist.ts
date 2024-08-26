import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveChecklistSchema,
  TSaveChecklistSchema,
} from '@/schemas/checklist/saveChecklist'

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
    register,
    control,
    watch,
    setValue,
    reset,
  } = useForm<TSaveChecklistSchema>({
    resolver: zodResolver(saveChecklistSchema),
    defaultValues: {
      name: '',
      type: '',
      status: true,
      sections: [],
    },
  })

  const {
    fields: sections,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'sections',
  })

  const isActive = watch('status')

  const handleActiveChange = useCallback(() => {
    setValue('status', !isActive)
  }, [setValue, isActive])

  const handleToggleEditSectionTitle = useCallback(
    (index: number) => {
      setValue(`sections.${index}.isEditing`, !sections[index].isEditing)
    },
    [sections, setValue],
  )

  const handleOpenSection = useCallback(
    (index: number) => {
      sections.forEach((_, sectionIndex) => {
        setValue(`sections.${sectionIndex}.isOpen`, sectionIndex === index)
        setValue(`sections.${sectionIndex}.isEditing`, sectionIndex === index)
      })
    },
    [sections, setValue],
  )

  const handleAddSection = useCallback(() => {
    append({ title: '', isEditing: true, isOpen: true, items: [] })
    handleOpenSection(sections.length)
  }, [append, handleOpenSection, sections.length])

  const handleDeleteSection = useCallback(
    (index: number) => {
      const nextIndex = index === 0 ? 0 : index - 1
      remove(index)
      handleOpenSection(nextIndex)
    },
    [remove, handleOpenSection],
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
    register,
    errors,
    sections,
    isActive,
    handleActiveChange,
    handleToggleEditSectionTitle,
    handleOpenSection,
    handleAddSection,
    handleDeleteSection,
    handleAddQuestion,
    handleDeleteQuestion,
  }
}
