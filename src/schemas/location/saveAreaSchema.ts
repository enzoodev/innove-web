import { TypeOf, z } from 'zod'

export const saveAreaSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  responsavelnome: z.string().min(1, 'O nome do responsável é obrigatório.'),
  responsavelemail: z
    .string()
    .min(1, 'O email do responsável é obrigatório.')
    .email('Email inválido.'),
  ativo: z.boolean(),
})

export type TSaveAreaSchema = TypeOf<typeof saveAreaSchema>
