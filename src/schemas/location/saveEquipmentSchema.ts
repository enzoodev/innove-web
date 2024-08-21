import { TypeOf, z } from 'zod'

export const saveEquipmentSchema = z.object({
  tipoequipamento: z.string().min(1, 'O tipo do equipamento é obrigatório.'),
  modelo: z.string().min(1, 'O modelo é obrigatório.'),
  placa: z.string().min(1, 'A placa é obrigatória.'),
  tag: z.string().min(1, 'A tag é obrigatória.'),
  responsavelnome: z.string().min(1, 'O nome do responsável é obrigatório.'),
  responsavelemail: z
    .string()
    .min(1, 'O email do responsável é obrigatório.')
    .email('Email inválido.'),
  ativo: z.boolean(),
})

export type TSaveEquipmentSchema = TypeOf<typeof saveEquipmentSchema>
