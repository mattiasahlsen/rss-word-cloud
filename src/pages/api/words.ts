// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MOCK_WORDS } from '@/mock-data/words'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  words: typeof MOCK_WORDS
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(200).json({ words: MOCK_WORDS })
}
