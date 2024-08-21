import { HttpServices } from '@/services/HttpServices'

export const createConstruction = async (params: TCreateConstructionParams) => {
  await HttpServices.post({
    url: 'addobra',
    data: params,
  })
}
