import { HttpServices } from '@/services/HttpServices'

export const inactiveQuestion = async (
  params: TInactiveChecklistQuestionParams,
) => {
  await HttpServices.delete({
    url: 'delquestion',
    params,
  })
}
