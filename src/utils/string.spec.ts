import { sanitizeString, sanitizeWord, stringToWords } from './string'

describe('stringToWords', () => {
  it('splits strings into words by the appropriate separators', () => {
    expect(stringToWords('hello world')).toEqual(['hello', 'world'])
    expect(stringToWords('hello, world')).toEqual(['hello', 'world'])
    expect(stringToWords('hello-world')).toEqual(['hello', 'world'])
    expect(stringToWords('hello_world-again')).toEqual([
      'hello',
      'world',
      'again',
    ])
    expect(stringToWords('hello****world%/again')).toEqual([
      'hello',
      'world',
      'again',
    ])
  })

  it('returns empty array for empty string and for strings with only separators', () => {
    expect(stringToWords('')).toEqual([])
    expect(stringToWords(' %% \n')).toEqual([])
  })
})

describe('sanitizeString', () => {
  it('removes urls', () => {
    expect(sanitizeString('hello https://www.google.com')).toEqual('hello ')
    expect(sanitizeString('hello https://www.google.com world')).toEqual(
      'hello  world'
    )
  })

  it('removes html tags', () => {
    expect(sanitizeString('hello <b>world</b>')).toEqual('hello world')
    expect(sanitizeString('hello <b>world</b> again')).toEqual(
      'hello world again'
    )
  })
})

describe('sanitizeWord', () => {
  it('removes invalid characters', () => {
    expect(sanitizeWord('hello')).toEqual('hello')
    expect(sanitizeWord('hello-world')).toEqual('helloworld')
    expect(sanitizeWord('hello_world')).toEqual('helloworld')
    expect(sanitizeWord('hello-world_again')).toEqual('helloworldagain')
  })
})
