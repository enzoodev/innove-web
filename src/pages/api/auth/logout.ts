import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest } from '@/services/handleRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await handleRequest(req)
  res.json(response)
}
