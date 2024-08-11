import { HttpServices } from '@/infrastructure/services/HttpServices'
import { TokenRepository } from '@/infrastructure/repositories/TokenRepository'
import { EncryptionService } from '@/infrastructure/services/EncryptionService'
import { CookieService } from '@/infrastructure/services/CookieService'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { RequestFormatter } from '@/utils/RequestFormatter'

export function createHttpService(): HttpServices {
  return new HttpServices(
    new UrlBuilder(),
    new RequestFormatter(),
    new TokenRepository(new EncryptionService(), new CookieService()),
    process.env.NEXT_PUBLIC_API_URL ??
      'https://safety360.espertibrasil.com.br/api/',
  )
}
