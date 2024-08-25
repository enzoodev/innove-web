type TRequestConfig = {
  url: string
  method?: HttpMethod
  data?: Record<string, unknown>
  params?: Record<string, any>
  type?: 'app' | 'auth'
}
