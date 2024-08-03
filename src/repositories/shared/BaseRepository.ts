import { UrlBuilder } from '@/utils/UrlBuilder'
import { HttpServices } from '@/services/HttpServices'

const appUrl = 'web'

export class BaseRepository {
  async getAll<T>(params: TRequestConfig): Promise<Array<T>> {
    return HttpServices.get({
      ...params,
      url: UrlBuilder.group(appUrl, params.url),
    })
  }

  async get<T>(params: TRequestConfig, id?: string): Promise<T> {
    return HttpServices.get({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    })
  }

  async create<T = unknown>(params: TRequestConfig): Promise<T> {
    return HttpServices.post({
      ...params,
      url: UrlBuilder.group(appUrl, params.url),
    })
  }

  async update<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.put({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    })
  }

  async delete<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.delete({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    })
  }

  async patch<T = unknown>(id: string, params: TRequestConfig): Promise<T> {
    return HttpServices.patch({
      ...params,
      url: UrlBuilder.group(appUrl, params.url, id),
    })
  }
}
