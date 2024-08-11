import Cookies from 'js-cookie'

export class CookieService implements ICookieService {
  get(name: string): string | undefined {
    return Cookies.get(name)
  }

  set(name: string, value: string, options?: Cookies.CookieAttributes): void {
    Cookies.set(name, value, options)
  }

  remove(name: string): void {
    Cookies.remove(name)
  }
}
