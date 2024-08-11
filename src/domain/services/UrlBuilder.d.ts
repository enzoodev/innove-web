interface IUrlBuilder {
  build(baseUrl: string, path: string, params?: Record<string, any>): string
  group(...list: Array<unknown>): string
}
