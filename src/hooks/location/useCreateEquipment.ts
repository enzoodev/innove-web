import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveEquipmentSchema,
  TSaveEquipmentSchema,
} from '@/schemas/location/saveEquipmentSchema'

import { createEquipment } from '@/query/location/createEquipment'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateEquipment = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const {
    mutateAsync: createEquipmentFn,
    isPending: isLoadingCreateEquipment,
  } = useMutation({
    mutationFn: createEquipment,
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
    reset,
  } = useForm<TSaveEquipmentSchema>({
    resolver: zodResolver(saveEquipmentSchema),
    defaultValues: {
      tipoequipamento: '',
      modelo: '',
      placa: '',
      tag: '',
      responsavelnome: '',
      responsavelemail: '',
      ativo: true,
    },
  })

  const isActive = watch('ativo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const onSubmit = useCallback(
    async (data: TSaveEquipmentSchema, callback: () => void) => {
      try {
        await createEquipmentFn({
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
    [clientId, createEquipmentFn, queryClient, reset],
  )

  const handleCreateEquipment = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    handleCreateEquipment,
    isLoadingCreateEquipment,
    register,
    errors,
    isActive,
    handleActiveChange,
  }
}
