export class UrlBuilder {
  private static readonly baseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    'https://safety360.espertibrasil.com.br/api/'

  public static readonly build = (
    baseURL: string,
    url: string,
    params?: Record<string, any>,
  ) => {
    const adjustedBaseURL = baseURL.endsWith('/')
      ? baseURL.slice(0, -1)
      : baseURL
    const adjustedUrl = url.startsWith('/') ? url.slice(1) : url

    const fullUrl = `${adjustedBaseURL}/${adjustedUrl}`

    if (params) {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined),
      )

      const searchParams = new URLSearchParams(filteredParams)
      return `${fullUrl}?${searchParams.toString()}`
    }

    return fullUrl
  }

  public static group(...list: Array<unknown>) {
    return list.filter((item) => !!item).join('/')
  }

  public static handleUrl(url: string) {
    return url
      .replace('/api', this.baseUrl)
      .replace('app', 'web')
      .replace('/auth', '')
  }
}
