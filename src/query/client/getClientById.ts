import { getClientMock } from '@/mocks/get-client-mock'
import { HttpServices } from '@/services/HttpServices'

export const getClientById = async (params: TGetClientParams) => {
  // const [client] = await HttpServices.get<Array<TClient>>({
  //   url: 'clients',
  //   params,
  // })

  // return client
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getClientMock as TClient
}
