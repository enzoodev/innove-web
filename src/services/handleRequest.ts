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

        const file = FileConverter.base64ToFile({
          base64String,
          fileName,
          fileType,
        })

        formData.append(key, file)
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
  return responseData.data
}
