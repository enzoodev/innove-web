import { getClientsMock } from '@/mocks/get-clients-mock'
import { HttpServices } from '@/services/HttpServices'

export const getAllClients = async () => {
  // return HttpServices.get<Array<TClient>>({
  //   url: 'clients',
  // })
  const clients = await HttpServices.get<Array<TClient>>({
    url: 'clients',
  })
  console.log('clients', clients)
  return getClientsMock as Array<TClient>
}
