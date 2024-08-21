import { TokenService } from '@/services/TokenService'

import { HttpMethod } from '@/enums/HttpMethod'

import { UrlBuilder } from '@/utils/UrlBuilder'
import { AppError } from '@/utils/error/AppError'
import { formatRequest } from '@/utils/formatRequest'
import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage'

export class HttpServices {
  private static readonly baseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    'https://safety360.espertibrasil.com.br/api/'

  private static readonly appUrl = 'web'

  private static async request<T>({
    url,
    method = HttpMethod.GET,
    data,
    formData,
    params,
    type = 'app',
  }: TRequestConfig): Promise<T> {
    try {
      const baseUrl =
        type === 'app' ? `${this.baseUrl}/${this.appUrl}` : this.baseUrl
      const constructedUrl = UrlBuilder.build(baseUrl, url, params)
      const requestBody = formatRequest(data, formData)
      const token = TokenService.get()

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
        await this.handleHttpError(response)
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

  private static async handleHttpError(response: Response): Promise<void> {
    if (response.status === 401) {
      TokenService.delete()
      throw new AppError('Unauthorized access. Please log in again.')
    }

    const error: TApiResponse = await response.json()
    const message = error.message ?? defaultErrorMessage
    throw new AppError(message)
  }

  public static readonly get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.GET, ...params })
  }

  public static readonly post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.POST, ...params })
  }

  public static readonly put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PUT, ...params })
  }

  public static readonly delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.DELETE, ...params })
  }

  public static readonly patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PATCH, ...params })
  }
}
