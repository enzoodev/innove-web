import { HttpServices } from '@/services/HttpServices'
import { TokenService } from '@/services/TokenService'

export const login = async (params: TLoginParams) => {
  const response = await HttpServices.post<TAuth>({
    url: 'login',
    data: params,
    type: 'auth',
  })

  TokenService.set(response.token)

  return response
}
