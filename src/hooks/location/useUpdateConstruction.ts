import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth/useAuth'

import {
  saveConstructionSchema,
  TSaveConstructionSchema,
} from '@/schemas/location/saveConstructionSchema'

import { getConstruction } from '@/query/location/getConstruction'
import { updateConstruction } from '@/query/location/updateConstruction'

import { QueryKey } from '@/enums/QueryKey'

type TUseUpdateConstructionParams = {
  locationId: number
  locationTypeId: number
}

export const useUpdateConstruction = ({
  locationId,
  locationTypeId,
}: TUseUpdateConstructionParams) => {
  const { clientId } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: getConstructionFn, isPending: isLoadingConstruction } =
    useMutation({
      mutationFn: getConstruction,
    })

  const {
    mutateAsync: updateConstructionFn,
    isPending: isLoadingUpdateConstruction,
  } = useMutation({
    mutationFn: updateConstruction,
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
    reset,
    control,
  } = useForm<TSaveConstructionSchema>({
    resolver: zodResolver(saveConstructionSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      razaosocial: '',
      datastart: '',
      rua: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      responsavelnome: '',
      responsavelemail: '',
      ativo: true,
    },
  })

  const isActive = watch('ativo')

  const handleActiveChange = useCallback(() => {
    setValue('ativo', !isActive)
  }, [setValue, isActive])

  const fetchConstruction = useCallback(async () => {
    try {
      const construction = await getConstructionFn({
        idtipo: locationTypeId,
        idlocal: locationId,
        idclient: clientId,
      })
      const [address] = construction.address

      reset({
        nome: construction.nome,
        cnpj: construction.cnpj,
        razaosocial: construction.razaosocial,
        datastart: construction.datestart,
        rua: address.rua,
        numero: address.numero,
        complemento: address.complemento ?? '',
        cep: address.cep.slice(0, 5) + '-' + address.cep.slice(5),
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
        responsavelnome: construction.responsavel,
        responsavelemail: construction.emailresponsavel,
        ativo: construction.status === '1',
      })
    } catch (error) {
      toast.error('Não foi possível buscar os dados da inspeção.')
    }
  }, [clientId, getConstructionFn, locationId, locationTypeId, reset])

  const onSubmit = useCallback(
    async (data: TSaveConstructionSchema, callback: () => void) => {
      try {
        await updateConstructionFn({
          ...data,
          idlocal: locationId.toString(),
          idclient: clientId.toString(),
          ativo: data.ativo ? '1' : '0',
        })
        callback()
        toast.success('Inspeção editada com sucesso!')
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LOCATIONS] })
        reset()
      } catch (error) {
        toast.error('Não foi possível editar a inspeção.')
      }
    },
    [updateConstructionFn, locationId, clientId, queryClient, reset],
  )

  const handleUpdateConstruction = useCallback(
    (callback: () => void) => handleSubmit((data) => onSubmit(data, callback)),
    [handleSubmit, onSubmit],
  )

  return {
    fetchConstruction,
    handleUpdateConstruction,
    isLoadingConstruction,
    isLoadingUpdateConstruction,
    register,
    control,
    errors,
    isActive,
    handleActiveChange,
  }
}
