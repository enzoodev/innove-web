import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveAreaSchema,
  TSaveAreaSchema,
} from '@/schemas/location/saveAreaSchema'

import { getArea } from '@/query/location/getArea'
import { updateArea } from '@/query/location/updateArea'

import { QueryKey } from '@/enums/QueryKey'

type TUseUpdateAreaParams = {
  locationId: number
  locationTypeId: number
}

export const useUpdateArea = ({
  locationId,
  locationTypeId,
}: TUseUpdateAreaParams) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getAreaFn, isPending: isLoadingArea } = useMutation({
    mutationKey: [QueryKey.GET_AREA_BY_ID, locationId],
    mutationFn: getArea,
  })

  const { mutateAsync: updateAreaFn, isPending: isLoadingUpdateArea } =
    useMutation({
      mutationFn: updateArea,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
    setValue,
  } = useForm<TSaveAreaSchema>({
    resolver: zodResolver(saveAreaSchema),
    defaultValues: {
      nome: '',
      responsavelnome: '',
      responsavelemail: '',
      ativo: true,
    },
  })

  const isActive = watch('ativo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const fetchArea = useCallback(async () => {
    try {
      const area = await getAreaFn({
        idlocal: locationId,
        idclient: clientId,
        idtipo: locationTypeId,
      })

      reset({
        nome: area.nome,
        responsavelnome: area.responsavel,
        responsavelemail: area.emailresponsavel,
        ativo: area.status === '1',
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [clientId, getAreaFn, locationId, locationTypeId, reset])

  const onSubmit = useCallback(
    async (data: TSaveAreaSchema, callback: () => void) => {
      try {
        await updateAreaFn({
          ...data,
          idlocal: locationId.toString(),
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        callback()
        toast.success('Inspeção editada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_AREA_BY_ID, locationId],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar a inspeção.')
      }
    },
    [updateAreaFn, locationId, clientId, queryClient, reset],
  )

  const handleUpdateArea = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    fetchArea,
    handleUpdateArea,
    isLoadingArea,
    isLoadingUpdateArea,
    register,
    errors,
    isActive,
    handleActiveChange,
  }
}
