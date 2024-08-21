import { HttpServices } from '@/services/HttpServices'

export const updateChecklist = async (params: TUpdateChecklistParams) => {
  await HttpServices.post({
    url: 'addchecklist',
    data: params,
  })
}
