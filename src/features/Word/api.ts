import { IWord } from '@/types/word'

export async function fetchWords(rssFeed: string): Promise<IWord[]> {
  const rssFeedUrl = new URL(rssFeed)

  const resp = await fetch('/api/words?feed=' + rssFeedUrl.toString())
  if (resp.ok) {
    const data = await resp.json()
    return data.words
  } else {
    throw new Error(`Failed to fetch words from ${rssFeed}: ${resp.statusText}`)
  }
}
