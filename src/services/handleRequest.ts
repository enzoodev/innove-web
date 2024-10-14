import { UrlBuilder } from '@/utils/UrlBuilder'
import { getHeaders } from '@/utils/getHeaders'
import { NextApiRequest } from 'next'

export const handleRequest = async (req: NextApiRequest) => {
  const url = UrlBuilder.handleUrl(req.url ?? '')
  const headers = getHeaders(req.method ?? '', req.headers.authorization ?? '')

  const formData = new FormData()

  if (req.body) {
    const body = JSON.parse(req.body)
    const { files, ...json } = body

    formData.append('json', JSON.stringify(json))

    if (files) {
      Object.keys(files).forEach((key) => {
        formData.append(key, files[key])
      })
    }
  }

  const response = await fetch(url, {
    method: req.method,
    body: req.body ? formData : null,
    credentials: 'include',
    headers,
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message)
  }

  return responseData.data
}
