import { HttpServices } from '@/services/HttpServices'

export const createClient = async (data: TCreateClientParams) => {
  await HttpServices.post({
    url: 'addclient',
    data,
  })
}
