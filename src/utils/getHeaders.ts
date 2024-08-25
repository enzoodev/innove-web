import { HttpMethod } from '@/enums/HttpMethod'

export const getHeaders = (
  method: string,
  authorization: string,
): HeadersInit => {
  if (method === HttpMethod.GET) {
    return {
      Authorization: authorization,
      'Content-Type': 'application/json',
    }
  }

  return {
    Authorization: authorization,
  }
}
