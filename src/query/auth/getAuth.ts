import { getAuthMock } from '@/mocks/get-auth-mock'
import { HttpServices } from '@/services/HttpServices'
import { TokenService } from '@/services/TokenService'

export const getAuth = async () => {
  // if (!TokenService.has()) {
  //   return null
  // }

  // return await HttpServices.get<TAuth>({
  //   url: 'user',
  //   type: 'auth',
  // })
  return getAuthMock as TAuth
}
