import { HttpServices } from '@/services/HttpServices'

export const getAllClients = async () => {
  return HttpServices.get<Array<TClient>>({
    url: 'clients',
  })
}
