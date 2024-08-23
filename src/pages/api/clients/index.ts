// pages/api/clients/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpServices } from '@/services/HttpServices'
import { TokenService } from '@/services/TokenService'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      //   const clients = await HttpServices.get<Array<TClient>>({
      //     url: 'clients',
      //   })
      const token = TokenService.get()
      const response = await fetch(
        'https://safety360.espertibrasil.com.br/api/web/clients',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 333137323131373938333157926e346f49a4ee79bd99184246d2589bb7dcdbd27c02bb4c5e25bcc30e646a',
          },
        },
      )
      const data = await response.json()
      res.status(200).json(data.data)
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    })
  }
}
