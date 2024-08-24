import { HttpServices } from '@/services/HttpServices'

export const getAllChecklists = async (params: TGetChecklistsParams) => {
  return HttpServices.get<Array<TChecklist>>({
    url: 'checklist',
    params,
  })
}
