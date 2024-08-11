/* eslint-disable no-useless-constructor */
import { AppError } from '@/utils/error/AppError'
import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage'
import { HttpMethod } from '@/enums/HttpMethod'

export class HttpServices implements IHttpServices {
  constructor(
    private readonly config: {
      urlBuilder: IUrlBuilder
      requestFormatter: IRequestFormatter
      tokenRepository: ITokenRepository
      baseUrl: string
    },
  ) {}

  private async request<T>({
    url,
    method = HttpMethod.GET,
    data,
    formData,
    params,
  }: TRequestConfig): Promise<T> {
    try {
      const constructedUrl = this.config.urlBuilder.build(
        this.config.baseUrl,
        url,
        params,
      )
      const requestBody = this.config.requestFormatter.format(data, formData)
      const token = this.config.tokenRepository.get()

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

  private async handleHttpError(response: Response): Promise<void> {
    if (response.status === 401) {
      this.config.tokenRepository.delete()
      throw new AppError('Unauthorized access. Please log in again.')
    }

    const error: TApiResponse = await response.json()
    const message = error.message ?? defaultErrorMessage
    throw new AppError(message)
  }

  public readonly get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.GET, ...params })
  }

  public readonly post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.POST, ...params })
  }

  public readonly put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PUT, ...params })
  }

  public readonly delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.DELETE, ...params })
  }

  public readonly patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PATCH, ...params })
  }
}
