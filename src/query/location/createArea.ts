import { HttpServices } from '@/services/HttpServices'

export const createArea = async (params: TCreateAreaParams) => {
  await HttpServices.post({
    url: 'addarea',
    data: params,
  })
}
