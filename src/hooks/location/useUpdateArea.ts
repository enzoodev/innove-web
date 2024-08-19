import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LocationRepository } from '@/infrastructure/repositories/LocationRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveAreaSchema,
  TSaveAreaSchema,
} from '@/schemas/location/saveAreaSchema'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const locationRepository = new LocationRepository(baseRepository)

export const useUpdateArea = (params: TGetLocationParams) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getAreaFn, isPending: isLoadingArea } = useMutation({
    mutationKey: [QueryKey.GET_AREA_BY_ID, params.idlocal],
    mutationFn: locationRepository.getArea,
  })

  const { mutateAsync: updateAreaFn, isPending: isLoadingUpdateArea } =
    useMutation({
      mutationFn: locationRepository.updateArea,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<TSaveAreaSchema>({
    resolver: zodResolver(saveAreaSchema),
    defaultValues: {
      nome: '',
      responsavelnome: '',
      responsavelemail: '',
      ativo: true,
    },
  })

  const fetchArea = useCallback(async () => {
    try {
      const area = await getAreaFn(params)

      reset({
        nome: area.nome,
        responsavelnome: area.responsavelnome,
        responsavelemail: area.responsavelemail,
        ativo: area.status === '1',
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [getAreaFn, params, reset])

  const onSubmit: SubmitHandler<TSaveAreaSchema> = useCallback(
    async (data) => {
      try {
        await updateAreaFn({
          ...data,
          idlocal: params.idlocal.toString(),
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        toast.success('Inspeção atualizada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_AREA_BY_ID, params.idlocal],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível atualizar a inspeção.')
      }
    },
    [updateAreaFn, params.idlocal, clientId, queryClient, reset],
  )

  const handleUpdateArea = handleSubmit(onSubmit)

  return {
    fetchArea,
    handleUpdateArea,
    isLoadingArea,
    isLoadingUpdateArea,
    register,
    errors,
  }
}
