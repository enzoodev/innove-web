import { HttpServices } from '@/services/HttpServices'

export const createClient = async ({ data, formData }: TCreateClientParams) => {
  await HttpServices.post({
    url: 'addclient',
    data,
    formData,
  })
}
