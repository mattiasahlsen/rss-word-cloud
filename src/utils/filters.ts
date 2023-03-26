import { ALL_INVALID_WORDS } from '@/constants/invalidWords'

export function wordFilter(word: string): boolean {
  return !ALL_INVALID_WORDS.includes(word) && word.length > 2
}
