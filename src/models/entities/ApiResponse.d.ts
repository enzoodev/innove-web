type TApiResponse<T = unknown> = {
  success: boolean
  message: string | null
  data: T
}
