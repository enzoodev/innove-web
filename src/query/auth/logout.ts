import { HttpServices } from '@/services/HttpServices'
import { TokenService } from '@/services/TokenService'

export const logout = async () => {
  await HttpServices.get({
    url: 'logout',
    type: 'auth',
  })

  TokenService.delete()
}
