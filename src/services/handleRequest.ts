import { NextApiRequest } from 'next'
import { UrlBuilder } from '@/utils/UrlBuilder'

export const handleRequest = async (req: NextApiRequest) => {
  const url = UrlBuilder.handleUrl(req.url ?? '')

  const response = await fetch(url, {
    method: req.method,
    credentials: 'include',
    headers: {
      Authorization: req.headers.authorization ?? 'no-token',
      'Content-Type': req.headers['content-type'] ?? 'application/json',
    },
  })

  const data = await response.json()
  return data.data
}
