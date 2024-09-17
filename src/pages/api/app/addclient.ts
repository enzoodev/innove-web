import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest } from '@/services/handleRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await handleRequest(req)
    res.json(response)
  } catch (error) {
    res.status(500).json({ message: (error as any).message })
  }
}
