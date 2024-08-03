type TRequestConfig = {
  url: string
  key: string
  method?: HttpMethod
  data?: Record<string, unknown>
  formData?: FormData
  params?: unknown
}
