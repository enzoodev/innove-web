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

import { getEquipment } from '@/query/location/getEquipment'
import { updateEquipment } from '@/query/location/updateEquipment'

import { QueryKey } from '@/enums/QueryKey'

type TUseUpdateConstructionParams = {
  locationId: number
  locationTypeId: number
}

export const useUpdateEquipment = ({
  locationId,
  locationTypeId,
}: TUseUpdateConstructionParams) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getEquipmentFn, isPending: isLoadingEquipment } =
    useMutation({
      mutationKey: [QueryKey.GET_EQUIPMENT_BY_ID, locationId],
      mutationFn: getEquipment,
    })

  const {
    mutateAsync: updateEquipmentFn,
    isPending: isLoadingUpdateEquipment,
  } = useMutation({
    mutationFn: updateEquipment,
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

  const userIsActive = watch('ativo')

  const handleUserActiveChange = useCallback(() => {
    setValue('ativo', !userIsActive)
  }, [setValue, userIsActive])

  const fetchEquipment = useCallback(async () => {
    try {
      const equipment = await getEquipmentFn({
        idclient: clientId,
        idlocal: locationId,
        idtipo: locationTypeId,
      })

      reset({
        tipoequipamento: equipment.nome,
        modelo: equipment.modelo,
        placa: equipment.placa,
        tag: equipment.tag,
        responsavelnome: equipment.responsavel,
        responsavelemail: equipment.emailresponsavel,
        ativo: equipment.status === '1',
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [clientId, getEquipmentFn, locationId, locationTypeId, reset])

  const onSubmit = useCallback(
    async (data: TSaveEquipmentSchema, callback: () => void) => {
      try {
        await updateEquipmentFn({
          ...data,
          idlocal: locationId.toString(),
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        callback()
        toast.success('Inspeção editada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_EQUIPMENT_BY_ID, locationId],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar a inspeção.')
      }
    },
    [updateEquipmentFn, locationId, clientId, queryClient, reset],
  )

  const handleUpdateEquipment = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    fetchEquipment,
    handleUpdateEquipment,
    isLoadingEquipment,
    isLoadingUpdateEquipment,
    register,
    errors,
    userIsActive,
    handleUserActiveChange,
  }
}
