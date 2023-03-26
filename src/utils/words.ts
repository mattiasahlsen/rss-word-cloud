import { IWord } from '@/types/word'

export function wordsToFrequencyMap(words: string[]): Record<string, number> {
  return words.reduce((acc, word) => {
    acc[word] = acc[word] ? acc[word] + 1 : 1
    return acc
  }, {} as Record<string, number>)
}

export function wordsFrequencyMapToWords(
  wordsFrequencyMap: Record<string, number>
): IWord[] {
  const wordsWithFrequency = Object.entries(wordsFrequencyMap)
    .map(([word, frequency]) => ({
      word,
      frequency,
    }))
    .sort((a, b) => b.frequency - a.frequency)

  const maxFrequency = wordsWithFrequency[0]?.frequency ?? 0
  return wordsWithFrequency.map((wordWithFrequency) => ({
    word: wordWithFrequency.word,
    weight: wordWithFrequency.frequency / maxFrequency,
  }))
}
