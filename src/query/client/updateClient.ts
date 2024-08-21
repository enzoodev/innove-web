import { HttpServices } from '@/services/HttpServices'

export const updateClient = async ({ data, formData }: TUpdateClientParams) => {
  await HttpServices.post({
    url: 'addclient',
    data,
    formData,
  })
}