import { HttpServices } from '@/services/HttpServices'
import { TokenService } from '@/services/TokenService'

export const getAuth = async () => {
  if (!TokenService.has()) {
    return null
  }

  return HttpServices.get<TAuth>({
    url: 'user',
    type: 'auth',
  })
}
