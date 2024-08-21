import { HttpServices } from '@/services/HttpServices'

export const updateArea = async (params: TUpdateAreaParams) => {
  await HttpServices.post({
    url: 'addarea',
    data: params,
  })
}
