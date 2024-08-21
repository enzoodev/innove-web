import { HttpServices } from '@/services/HttpServices'

export const getClientById = async (params: TGetClientParams) => {
  const [client] = await HttpServices.get<Array<TClient>>({
    url: 'clients',
    params,
  })

  return client
}
