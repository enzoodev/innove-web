import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
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

export const useCreateArea = () => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: createAreaFn, isPending: isLoadingCreateArea } =
    useMutation({
      mutationFn: locationRepository.createArea,
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

  const onSubmit = useCallback(
    async (data: TSaveAreaSchema, callback: () => void) => {
      try {
        await createAreaFn({
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
    [clientId, createAreaFn, queryClient, reset],
  )

  const handleCreateArea = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    handleCreateArea,
    isLoadingCreateArea,
    register,
    errors,
  }
}
