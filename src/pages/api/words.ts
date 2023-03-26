// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MOCK_WORDS } from '@/mock-data/words'
import { IWord } from '@/types/word'
import { wordFilter } from '@/utils/filters'
import { sanitizeString, sanitizeWord, stringToWords } from '@/utils/string'
import { wordsFrequencyMapToWords, wordsToFrequencyMap } from '@/utils/words'
import type { NextApiRequest, NextApiResponse } from 'next'
import Parser from 'rss-parser'

const parser = new Parser()

type Data =
  | {
      words: typeof MOCK_WORDS
    }
  | { error: string }

async function getWords(url: string): Promise<IWord[]> {
  const myUrl = new URL(url)
  if (myUrl.searchParams.get('limit') === null) {
    myUrl.searchParams.set('limit', '100')
  }

  const data = await parser.parseURL(myUrl.toString())
  const strings = data.items
    .map((item) => [item.title])
    .flat()
    .filter((s) => !!s) as string[]

  const words = strings
    .map(sanitizeString)
    .map(stringToWords)
    .flat()
    .map(sanitizeWord)
    .filter(wordFilter)

  const wordsMap = wordsToFrequencyMap(words)
  const wordsWithWeight = wordsFrequencyMapToWords(wordsMap)
  return wordsWithWeight.filter((w) => w.weight > 0.1).slice(0, 100)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const feed = req.query.feed
  if (typeof feed !== 'string') {
    return res.status(400).json({ error: 'feed must be a string' })
  }

  const words = await getWords(feed)
  return res.status(200).json({ words })
}
