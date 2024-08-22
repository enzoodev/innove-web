/* eslint-disable camelcase */
import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  saveClientSchema,
  TSaveClientSchema,
} from '@/schemas/clients/saveClientSchema'

import { createClient } from '@/query/client/createClient'

import { QueryKey } from '@/enums/QueryKey'

export const useCreateClient = () => {
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

  const { mutateAsync: createClientFn, isPending: isLoadingCreateClient } =
    useMutation({
      mutationFn: createClient,
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
