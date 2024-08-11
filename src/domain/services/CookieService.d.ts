interface ICookieService {
  get(name: string): string | undefined
  set(name: string, value: string, options?: Cookies.CookieAttributes): void
  remove(name: string): void
}
