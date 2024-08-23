/* eslint-disable camelcase */
import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
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
  const [previewIcon, setPreviewIcon] = useState<string | null>(null)
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
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
    watch,
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
  const registerWithMask = useHookFormMask(register)

  const isActive = watch('ativo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const handleFileIcon: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (!target.files) return
      const file = target.files[0]
      const iconURL = URL.createObjectURL(file)
      setPreviewIcon(iconURL)
      setValue('file_icon', file)
    },
    [setValue],
  )

  const handleFileLogo: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (!target.files) return
      const file = target.files[0]
      const iconURL = URL.createObjectURL(file)
      setPreviewLogo(iconURL)
      setValue('file_logo', file)
    },
    [setValue],
  )

  const fetchClientFiles = useCallback(
    async ({ icon, logo }: TClientAttachments) => {
      let fileIcon: File | undefined
      let fileLogo: File | undefined

      if (icon) {
        fileIcon = createFile({
          base64String: icon.file,
          fileName: icon.filename ?? `icon-${clientId}`,
          fileType: icon.extension,
        })
      }

      if (logo) {
        fileLogo = createFile({
          base64String: logo.file,
          fileName: logo.filename ?? `logo-${clientId}`,
          fileType: logo.extension,
        })
      }

      return {
        icon: fileIcon,
        logo: fileLogo,
      }
    },
    [clientId],
  )

  const fetchClient = useCallback(async () => {
    try {
      const client = await getClientByIdFn({ idclient: clientId })
      const { icon, logo } = await fetchClientFiles(client.anexo)
      const [address] = client.address

      if (icon) {
        const iconURL = URL.createObjectURL(icon)
        setPreviewIcon(iconURL)
      }

      if (logo) {
        const logoURL = URL.createObjectURL(logo)
        setPreviewLogo(logoURL)
      }

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
    isLoadingClient: isLoadingGetClient,
    isLoadingUpdateClient,
    register,
    registerWithMask,
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
