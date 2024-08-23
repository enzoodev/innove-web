import { getClientsMock } from '@/mocks/get-clients-mock'
import { HttpServices } from '@/services/HttpServices'

export const getAllClients = async () => {
  // return HttpServices.get<Array<TClient>>({
  //   url: 'clients',
  // })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getClientsMock as Array<TClient>
}
