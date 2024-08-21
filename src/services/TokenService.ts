import { CookieService } from './CookieService'
import { EncryptionService } from './EncryptionService'

export class TokenService {
  private static readonly cookieKey = '@INNOVE:TOKEN'
  private static readonly encryptionKey =
    process.env.NEXT_PUBLIC_SECRET_ENCRYPT ?? 'encryption-key'

  public static get(): string | null {
    const encryptedToken = CookieService.get(this.cookieKey)

    if (!encryptedToken) {
      return null
    }

    return EncryptionService.decrypt(encryptedToken, this.encryptionKey)
  }

  public static has(): boolean {
    return !!this.get()
  }

  public static set(token: string): void {
    const encryptedToken = EncryptionService.encrypt(token, this.encryptionKey)
    CookieService.set(this.cookieKey, encryptedToken, {
      secure: true,
      sameSite: 'Strict',
      expires: 3,
    })
  }

  public static delete(): void {
    CookieService.remove(this.cookieKey)
  }
}
