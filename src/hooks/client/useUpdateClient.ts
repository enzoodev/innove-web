/* eslint-disable camelcase */
import { ChangeEventHandler, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  saveClientSchema,
  TSaveClientSchema,
} from '@/schemas/clients/saveClientSchema'

import { getClientById } from '@/query/client/getClientById'
import { updateClient } from '@/query/client/updateClient'

import { QueryKey } from '@/enums/QueryKey'

import { createFile } from '@/utils/createFile'

export const useUpdateClient = (clientId: number) => {
  const [isLoadingFetchFiles, setIsLoadingFetchFiles] = useState(true)
  const queryClient = useQueryClient()

  const { mutateAsync: getClientByIdFn, isPending: isLoadingGetClient } =
    useMutation({
      mutationKey: [QueryKey.GET_CLIENT_BY_ID, clientId],
      mutationFn: getClientById,
    })

  const { mutateAsync: updateClientFn, isPending: isLoadingUpdateClient } =
    useMutation({
      mutationFn: updateClient,
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

  const fetchClientFiles = useCallback(
    async (files: TClientAttachments) => {
      try {
        setIsLoadingFetchFiles(true)

        const promises: Array<Promise<File>> = []

        Object.keys(files).forEach((key: string) => {
          const fileKey = key as keyof TClientAttachments

          if (!files[fileKey]) {
            return
          }

          promises.push(
            createFile({
              base64String: files[fileKey].file,
              fileName: files[fileKey].filename ?? `${fileKey}-${clientId}`,
              fileType: files[fileKey].extension,
            }),
          )
        })

        const [icon, logo] = await Promise.all(promises)

        return {
          icon,
          logo,
        }
      } finally {
        setIsLoadingFetchFiles(false)
      }
    },
    [clientId],
  )

  const fetchClient = useCallback(async () => {
    try {
      const client = await getClientByIdFn({ idclient: clientId })
      const { icon, logo } = await fetchClientFiles(client.anexo)
      const [address] = client.address

      reset({
        name: client.name,
        cpnj: client.cnpj,
        razaosocial: client.razaosocial,
        rua: address.rua,
        numero: address.numero,
        complemento: address.complemento ?? undefined,
        cep: address.cep,
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
        ativo: client.status === '1',
        file_icon: icon,
        file_logo: logo,
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do cliente.')
    }
  }, [clientId, fetchClientFiles, getClientByIdFn, reset])

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

        await updateClientFn({
          data: {
            ...dataToRequest,
            ativo: dataToRequest.ativo ? '1' : '0',
            idclient: clientId.toString(),
          },
          formData,
        })
        callback()
        toast.success('Cliente editado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GET_CLIENT_BY_ID, clientId],
        })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar o cliente.')
      }
    },
    [updateClientFn, clientId, queryClient, reset],
  )

  const handleUpdateClient = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    fetchClient,
    handleUpdateClient,
    isLoadingClient: isLoadingGetClient || isLoadingFetchFiles,
    isLoadingUpdateClient,
    register,
    errors,
    handleFileIcon,
    handleFileLogo,
  }
}
