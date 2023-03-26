import { wordsFrequencyMapToWords, wordsToFrequencyMap } from './words'

describe('wordsToFrequencyMap', () => {
  it('returns an empty object for an empty array', () => {
    expect(wordsToFrequencyMap([])).toEqual({})
  })

  it('returns a map of words to their frequency', () => {
    expect(wordsToFrequencyMap(['hello', 'world', 'hello'])).toEqual({
      hello: 2,
      world: 1,
    })
  })
})

describe('wordsFrequencyMapToWords', () => {
  it('returns an empty array for an empty object', () => {
    expect(wordsFrequencyMapToWords({})).toEqual([])
  })

  it('returns an array of words with their weight', () => {
    expect(
      wordsFrequencyMapToWords({
        hello: 2,
        world: 1,
      })
    ).toEqual([
      {
        word: 'hello',
        weight: 1,
      },
      {
        word: 'world',
        weight: 0.5,
      },
    ])
  })

  it('returns multiple words with weight 1 if they all have the top frequency', () => {
    expect(
      wordsFrequencyMapToWords({
        hello: 4,
        world: 4,
        test: 1,
      })
    ).toEqual([
      {
        word: 'hello',
        weight: 1,
      },
      {
        word: 'world',
        weight: 1,
      },
      {
        word: 'test',
        weight: 0.25,
      },
    ])
  })
})
