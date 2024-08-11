interface ITokenRepository {
  get(): string | null
  has(): boolean
  set(token: string): void
  delete(): void
}
