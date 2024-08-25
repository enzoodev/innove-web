import { HttpServices } from '@/services/HttpServices'

export const updateClient = async (data: TUpdateClientParams) => {
  await HttpServices.post({
    url: 'addclient',
    data,
  })
}
