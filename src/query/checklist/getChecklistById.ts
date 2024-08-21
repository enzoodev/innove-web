import { HttpServices } from '@/services/HttpServices'

export const getChecklistById = async (params: TGetChecklistParams) => {
  const [checklist] = await HttpServices.get<Array<TChecklist>>({
    url: 'checklist',
    params,
  })

  return checklist
}
