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

import { createClient } from '@/query/client/createClient'

import { QueryKey } from '@/enums/QueryKey'

import { FileConverter } from '@/utils/FileConverter'

export const useCreateClient = () => {
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

  const onSubmit = useCallback(
    async (data: TSaveClientSchema, callback: () => void) => {
      try {
        const { file_icon, file_logo, ...dataToRequest } = data

        await createClientFn({
          ...dataToRequest,
          ativo: dataToRequest.ativo ? '1' : '0',
          files: {
            file_icon,
            file_logo,
          },
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
    control,
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
