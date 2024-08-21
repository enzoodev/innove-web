import { HttpServices } from '@/services/HttpServices'

export const createChecklist = async (params: TCreateChecklistParams) => {
  await HttpServices.post({
    url: 'addchecklist',
    data: params,
  })
}
