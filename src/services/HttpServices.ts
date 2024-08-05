import { HttpMethod } from '@/enums/HttpMethod'
import { UrlBuilder } from '@/utils/UrlBuilder'
import { AppError } from '@/utils/error/AppError'
import { formatBodyToRequest } from '@/utils/formatBodyToRequest'
import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage'
import { TokenRepository } from '@/repositories/TokenRepository'

export class HttpServices {
  private static baseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    'https://safety360.espertibrasil.com.br/api/'

  private static request = async <T>({
    url,
    method = HttpMethod.GET,
    data,
    formData,
    params,
  }: TRequestConfig): Promise<T> => {
    try {
      const constructedUrl = UrlBuilder.build(this.baseUrl, url, params)
      const requestBody = formatBodyToRequest(data, formData)
      const token = TokenRepository.get()

      const response = await fetch(constructedUrl, {
        method,
        body: requestBody,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token ?? 'no-token'}`,
          'Content-Type':
            method === HttpMethod.POST
              ? 'multipart/form-data'
              : 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          console.error(
            'Você não está logado no Innove, realize o login novamente.',
          )
          TokenRepository.delete()
          window.location.href = '/auth/LOGIN'
        }

        const error: TApiResponse = await response.json()
        const message = error.message ?? defaultErrorMessage
        throw new AppError(message)
      }

      const responseData: TApiResponse<T> = await response.json()
      return responseData.data
    } catch (error) {
      if (error instanceof AppError) {
        throw error.message
      }

      throw defaultErrorMessage
    }
  }

  public static readonly get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.GET,
      ...params,
    })
  }

  public static readonly post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.POST,
      ...params,
    })
  }

  public static readonly put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.PUT,
      ...params,
    })
  }

  public static readonly delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.DELETE,
      ...params,
    })
  }

  public static readonly patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({
      method: HttpMethod.PATCH,
      ...params,
    })
  }
}
