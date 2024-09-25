import { NextApiRequest } from 'next'
import { UrlBuilder } from '@/utils/UrlBuilder'
import { getHeaders } from '@/utils/getHeaders'
import { FileConverter } from '@/utils/FileConverter'

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
        const fileUri = files[key]

        const { base64String, fileType, fileName } =
          FileConverter.extractFileDataFromUri(fileUri)

        const buffer = Buffer.from(base64String, 'base64')
        const file = new Blob([buffer], { type: fileType })
        formData.append(key, file, fileName)
      })
    }
  }

  const response = await fetch(url, {
    method: req.method,
    body: req.body ? formData : null,
    credentials: 'include',
    headers,
  })

  const isTextResponse =
    response.headers.get('Content-Type')?.includes('text/plain') ?? false

  if (isTextResponse) {
    return await response.text()
  }

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message)
  }

  return responseData.data
}
