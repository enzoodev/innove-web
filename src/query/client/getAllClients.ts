// import { getClientsMock } from '@/mocks/get-clients-mock'
// import { HttpServices } from '@/services/HttpServices'

import { TokenService } from '@/services/TokenService'

// export const getAllClients = async () => {
//   // return HttpServices.get<Array<TClient>>({
//   //   url: 'clients',
//   // })
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   return getClientsMock as Array<TClient>
// }

export const getAllClients = async () => {
  console.log('cuzinho')
  console.log(TokenService.get())
  const response = await fetch('/api/clients')
  const data = await response.json()
  console.log(data)
  // if (!response.ok) {
  //   throw new Error('Failed to fetch clients')
  // }
  // const data = await response.json()
  // return data.data as Array<TClient>
  return data
}
