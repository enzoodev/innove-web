import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveConstructionSchema,
  TSaveConstructionSchema,
} from '@/schemas/location/saveConstructionSchema'

import { createConstruction } from '@/query/location/createConstruction'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateConstruction = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const {
    mutateAsync: createConstructionFn,
    isPending: isLoadingCreateConstruction,
  } = useMutation({
    mutationFn: createConstruction,
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
    reset,
  } = useForm<TSaveConstructionSchema>({
    resolver: zodResolver(saveConstructionSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      razaosocial: '',
      datastart: '',
      rua: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      responsavelnome: '',
      responsavelemail: '',
      ativo: true,
    },
  })
  const registerWithMask = useHookFormMask(register)

  const isActive = watch('ativo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const onSubmit = useCallback(
    async (data: TSaveConstructionSchema, callback: () => void) => {
      try {
        await createConstructionFn({
          ...data,
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        callback()
        toast.success('Inspeção cadastrada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível cadastrar a inspeção.')
      }
    },
    [clientId, createConstructionFn, queryClient, reset],
  )

  const handleCreateConstruction = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    handleCreateConstruction,
    isLoadingCreateConstruction,
    register,
    registerWithMask,
    errors,
    isActive,
    handleActiveChange,
  }
}
