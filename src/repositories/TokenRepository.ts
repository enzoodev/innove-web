import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

export class TokenRepository {
  private static cookieKey = '@INNOVE:TOKEN'

  public static get(): string | null {
    const encryptedToken = Cookies.get(this.cookieKey)

    if (!encryptedToken) {
      return null
    }

    const wordsList = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.NEXT_PUBLIC_SECRET_ENCRYPT as string,
    )

    const decryptedToken = wordsList.toString(CryptoJS.enc.Utf8)
    console.log(decryptedToken)
    return decryptedToken
  }

  public static has(): boolean {
    return !!this.get()
  }

  public static set(token: string): void {
    const wordsList = CryptoJS.AES.encrypt(
      token,
      process.env.NEXT_PUBLIC_SECRET_ENCRYPT as string,
    )

    const encryptedToken = wordsList.toString()

    Cookies.set(this.cookieKey, encryptedToken, {
      secure: true,
      sameSite: 'Strict',
      expires: 3,
    })
  }

  public static delete(): void {
    Cookies.remove(this.cookieKey)
  }
}
