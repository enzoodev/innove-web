import { HttpServices } from '@/infrastructure/services/HttpServices'
import { UrlBuilder } from '@/utils/UrlBuilder'
import { TokenRepository } from '@/infrastructure/repositories/TokenRepository'
import { RequestFormatter } from '@/utils/RequestFormatter'
import { EncryptionService } from '../services/EncryptionService'

export function createHttpService(): HttpServices {
  return new HttpServices(
    new UrlBuilder(),
    new RequestFormatter(),
    new TokenRepository(new EncryptionService(), new CookieService()),
    process.env.NEXT_PUBLIC_API_URL ??
      'https://safety360.espertibrasil.com.br/api/',
  )
}
