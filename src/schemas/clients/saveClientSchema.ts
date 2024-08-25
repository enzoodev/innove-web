import { z, TypeOf } from 'zod'

export const saveClientSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  cpnj: z
    .string()
    .min(1, 'O CNPJ é obrigatório.')
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido.'),
  razaosocial: z.string().min(1, 'A razão social é obrigatória.'),
  rua: z.string().min(1, 'A rua é obrigatória.'),
  numero: z.string().min(1, 'O número é obrigatório.'),
  complemento: z.string().optional(),
  cep: z
    .string()
    .min(1, 'O CEP é obrigatório.')
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido.'),
  bairro: z.string().min(1, 'O bairro é obrigatório.'),
  cidade: z.string().min(1, 'A cidade é obrigatória.'),
  estado: z.string().min(1, 'O estado é obrigatório.'),
  ativo: z.boolean(),
  file_icon: z.string().optional(),
  file_logo: z.string().optional(),
})

export type TSaveClientSchema = TypeOf<typeof saveClientSchema>
