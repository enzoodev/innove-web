/* eslint-disable camelcase */
import { ChangeEventHandler, useCallback, useRef } from 'react'
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

import { FileConverter } from '@/utils/FileConverter'

export const useUpdateClient = (clientId: number) => {
  const iconInputRef = useRef<HTMLInputElement | null>(null)
  const logoInputRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()

  const handleIconContainerClick = useCallback(() => {
    iconInputRef.current?.click()
  }, [])

  const handleLogoContainerClick = useCallback(() => {
    logoInputRef.current?.click()
  }, [])

  const { mutateAsync: getClientByIdFn, isPending: isLoadingGetClient } =
    useMutation({
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
    watch,
    control,
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

  const isActive = watch('ativo')
  const previewIcon = watch('file_icon')
  const previewLogo = watch('file_logo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const handleFileIcon: ChangeEventHandler<HTMLInputElement> = useCallback(
    async ({ target }) => {
      if (!target.files) return
      const file = target.files[0]
      const icon = await FileConverter.fileToBase64(file)
      setValue('file_icon', icon)
    },
    [setValue],
  )

  const handleFileLogo: ChangeEventHandler<HTMLInputElement> = useCallback(
    async ({ target }) => {
      if (!target.files) return
      const file = target.files[0]
      const logo = await FileConverter.fileToBase64(file)
      setValue('file_logo', logo)
    },
    [setValue],
  )

  const fetchClient = useCallback(async () => {
    try {
      const client = await getClientByIdFn({ idclient: clientId })
      const [address] = client.address
      const { icon, incon } = client.anexo
      const formattedIcon = icon ? FileConverter.formatUri(icon) : undefined
      const formattedLogo = incon ? FileConverter.formatUri(incon) : undefined

      reset({
        name: client.name,
        cpnj: client.cnpj,
        razaosocial: client.razaosocial,
        rua: address.rua,
        numero: address.numero,
        complemento: address.complemento ?? '',
        cep: address.cep,
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
        ativo: client.status === '1',
        file_icon: formattedIcon,
        file_logo: formattedLogo,
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados do cliente.')
    }
  }, [clientId, getClientByIdFn, reset])

  const onSubmit = useCallback(
    async (data: TSaveClientSchema, callback: () => void) => {
      try {
        const { file_icon, file_logo, ...dataToRequest } = data

        await updateClientFn({
          ...dataToRequest,
          idclient: clientId.toString(),
          ativo: dataToRequest.ativo ? '1' : '0',
          files: {
            file_icon,
            file_logo,
          },
        })
        callback()
        toast.success('Cliente editado com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CLIENTS] })
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
    isLoadingClient: isLoadingGetClient,
    isLoadingUpdateClient,
    register,
    control,
    errors,
    handleFileIcon,
    handleFileLogo,
    isActive,
    handleActiveChange,
    iconInputRef,
    logoInputRef,
    previewIcon,
    previewLogo,
    handleIconContainerClick,
    handleLogoContainerClick,
  }
}
