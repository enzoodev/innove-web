import { TypeOf, z } from 'zod'

export const saveConstructionSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  cnpj: z
    .string()
    .min(1, 'O CNPJ é obrigatório.')
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido.'),
  razaosocial: z.string().min(1, 'A razão social é obrigatória.'),
  datastart: z
    .string()
    .min(1, 'A data de início é obrigatória.')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida.')
    .refine((date) => {
      const [day, month, year] = date.split('/').map(Number)
      const dateObj = new Date(year, month - 1, day)
      return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
      )
    }, 'Data inválida no calendário.'),
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
  responsavelnome: z.string().min(1, 'O nome do responsável é obrigatório.'),
  responsavelemail: z
    .string()
    .min(1, 'O email do responsável é obrigatório.')
    .email('Email inválido.'),
  ativo: z.boolean(),
})

export type TSaveConstructionSchema = TypeOf<typeof saveConstructionSchema>
