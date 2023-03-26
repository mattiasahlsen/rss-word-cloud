import { wordFilter } from './filters'

describe('wordFilter', () => {
  it('returns true for valid words', () => {
    expect(wordFilter('hello')).toBe(true)
    expect(wordFilter('ast')).toBe(true)
  })

  it('returns false for 0-letter and 1-letter words', () => {
    expect(wordFilter('')).toBe(false)
    expect(wordFilter('a')).toBe(false)
    expect(wordFilter('b')).toBe(false)
  })

  it('returns false for un-interesting words', () => {
    expect(wordFilter('the')).toBe(false)
    expect(wordFilter('and')).toBe(false)
  })
})
