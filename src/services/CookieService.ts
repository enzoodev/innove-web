import Cookies from 'js-cookie'

export class CookieService {
  public static get(name: string): string | undefined {
    return Cookies.get(name)
  }

  public static set(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes,
  ): void {
    Cookies.set(name, value, options)
  }

  public static remove(name: string): void {
    Cookies.remove(name)
  }
}
