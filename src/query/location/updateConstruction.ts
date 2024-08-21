import { HttpServices } from '@/services/HttpServices'

export const updateConstruction = async (params: TUpdateConstructionParams) => {
  await HttpServices.post({
    url: 'addobra',
    data: params,
  })
}
