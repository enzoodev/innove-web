/* eslint-disable no-useless-constructor */

export class TokenRepository implements ITokenRepository {
  private readonly cookieKey = '@INNOVE:TOKEN'
  private readonly encryptionKey =
    process.env.NEXT_PUBLIC_SECRET_ENCRYPT ?? 'encryption-key'

  constructor(
    private readonly encryptionService: IEncryptionService,
    private readonly cookieService: ICookieService,
  ) {}

  public get(): string | null {
    const encryptedToken = this.cookieService.get(this.cookieKey)

    if (!encryptedToken) {
      return null
    }

    return this.encryptionService.decrypt(encryptedToken, this.encryptionKey)
  }

  public has(): boolean {
    return this.get() !== null
  }

  public set(token: string): void {
    const encryptedToken = this.encryptionService.encrypt(
      token,
      this.encryptionKey,
    )
    this.cookieService.set(this.cookieKey, encryptedToken, {
      secure: true,
      sameSite: 'Strict',
      expires: 3,
    })
  }

  public delete(): void {
    this.cookieService.remove(this.cookieKey)
  }
}
