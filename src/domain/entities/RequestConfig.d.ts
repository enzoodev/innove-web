type TRequestConfig = {
  url: string
  method?: HttpMethod
  data?: Record<string, unknown>
  formData?: FormData
  params?: Record<string, any>
  type?: 'app' | 'auth'
}
