/* eslint-disable camelcase */
import { ChangeEventHandler, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ClientRepository } from '@/infrastructure/repositories/ClientRepository'
import { BaseRepository } from '@/infrastructure/repositories/shared/BaseRepository'
import { httpServicesFactory } from '@/infrastructure/factories/httpServicesFactory'

import {
  saveClientSchema,
  TSaveClientSchema,
} from '@/schemas/clients/saveClientSchema'

import { QueryKey } from '@/enums/QueryKey'

import { UrlBuilder } from '@/utils/UrlBuilder'

const httpServices = httpServicesFactory()
const baseRepository = new BaseRepository(httpServices, new UrlBuilder())
const clientRepository = new ClientRepository(baseRepository)

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createClientFn, isPending: isLoadingCreateClient } =
    useMutation({
      mutationFn: clientRepository.create,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
  } = useForm<TSaveClientSchema>({
    resolver: zodResolver(saveClientSchema),
    defaultValues: {
      name: '',
      cpnj: '',
      razaosocial: '',
      rua: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      ativo: true,
      file_icon: undefined,
      file_logo: undefined,
    },
  })

  const handleFileIcon: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (!target.files) return
      setValue('file_icon', target.files[0])
    },
    [setValue],
  )

  const handleFileLogo: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (!target.files) return
      setValue('file_logo', target.files[0])
    },
    [setValue],
  )

  const onSubmit = useCallback(
    async (data: TSaveClientSchema, callback: () => void) => {
      try {
        const { file_icon, file_logo, ...dataToRequest } = data
        const formData = new FormData()

        if (file_icon) {
          formData.append('file_icon', file_icon)
        }

        if (file_logo) {
          formData.append('file_logo', file_logo)
        }

        await createClientFn({
          data: {
            ...dataToRequest,
            ativo: dataToRequest.ativo ? '1' : '0',
          },
          formData,
        })
        callback()
        toast.success('Cliente cadastrado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível cadastrar o cliente.')
      }
    },
    [createClientFn, queryClient, reset],
  )

  const handleCreateClient = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    handleCreateClient,
    isLoadingCreateClient,
    register,
    errors,
    handleFileIcon,
    handleFileLogo,
  }
}
