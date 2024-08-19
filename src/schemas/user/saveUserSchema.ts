import { TypeOf, z } from 'zod'

export const saveUserSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  telefone: z
    .string()
    .min(1, 'O telefone é obrigatório.')
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido.'),
  email: z.string().min(1, 'O email é obrigatório.').email('Email inválido.'),
  ativo: z.boolean(),
  permission: z.array(z.number()).nonempty('Conceda ao menos uma permissão.'),
})

export type TSaveUserSchema = TypeOf<typeof saveUserSchema>
