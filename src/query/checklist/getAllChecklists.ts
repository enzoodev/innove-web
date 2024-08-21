import { HttpServices } from '@/services/HttpServices'
import { getChecklistsMock } from '@/mocks/get-checklists-mock'

export const getAllChecklists = async (params: TGetChecklistsParams) => {
  // return HttpServices.get<Array<TChecklist>>({
  //   url: 'checklist',
  //   params,
  // })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getChecklistsMock as Array<TChecklist>
}
