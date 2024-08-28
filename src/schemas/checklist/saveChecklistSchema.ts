import { TypeOf, z } from 'zod'

export const saveChecklistSchema = z.object({
  name: z.string().min(1, 'O nome do checklist é obrigatório.'),
  type: z.string().min(1, 'O tipo do checklist é obrigatório.'),
  status: z.boolean(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1, 'O título do tópico é obrigatório.'),
        isOpen: z.boolean(),
        isEditing: z.boolean(),
        items: z
          .array(
            z.object({
              id: z.string(),
              questionId: z.string(),
              name: z.string().min(1, 'O nome da questão é obrigatório.'),
              status: z.boolean(),
            }),
          )
          .min(1, 'Cada seção deve ter ao menos um item.'),
      }),
    )
    .min(1, 'Deve haver ao menos uma seção.'),
})

export type TSaveChecklistSchema = TypeOf<typeof saveChecklistSchema>
