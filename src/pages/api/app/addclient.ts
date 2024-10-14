import { handleRequest } from '@/services/handleRequest'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await handleRequest(req)
  res.json(response)
}
