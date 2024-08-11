import { HttpServices } from '@/infrastructure/services/HttpServices'
import { TokenRepository } from '@/infrastructure/repositories/TokenRepository'
import { EncryptionService } from '@/infrastructure/services/EncryptionService'
import { CookieService } from '@/infrastructure/services/CookieService'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { RequestFormatter } from '@/utils/RequestFormatter'

export function httpServicesFactory(): HttpServices {
  return new HttpServices({
    urlBuilder: new UrlBuilder(),
    requestFormatter: new RequestFormatter(),
    tokenRepository: new TokenRepository(
      new EncryptionService(),
      new CookieService(),
    ),
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ??
      'https://safety360.espertibrasil.com.br/api/',
  })
}
