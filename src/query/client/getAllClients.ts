import { getClientsMock } from '@/mocks/get-clients-mock'
import { HttpServices } from '@/services/HttpServices'

export const getAllClients = async () => {
  // return HttpServices.get<Array<TClient>>({
  //   url: 'clients',
  // })
  return getClientsMock as Array<TClient>
}
