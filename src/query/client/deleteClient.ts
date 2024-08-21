import { HttpServices } from '@/services/HttpServices'

export const deleteClient = async (params: TDeleteClientParams) => {
  await HttpServices.delete({
    url: 'delclient',
    params,
  })
}
