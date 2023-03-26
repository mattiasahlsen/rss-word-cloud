import {
  HTML_TAG_REGEXP,
  INVALID_CHARACTER_REGEXP,
  SEPARATOR,
  URL_REGEX,
} from '@/constants/regex'

export function stringToWords(str: string): string[] {
  return str.split(SEPARATOR).filter((word) => word.length > 0)
}

export function sanitizeString(str: string): string {
  let s = str.toLowerCase()
  s = removeUrls(s)
  s = removeHtmlTags(s)
  return s
}

export function sanitizeWord(word: string): string {
  return word.replace(new RegExp(INVALID_CHARACTER_REGEXP, 'g'), '')
}

export function removeUrls(str: string): string {
  return str.replace(new RegExp(URL_REGEX, 'g'), '')
}

export function removeHtmlTags(str: string): string {
  return str.replace(new RegExp(HTML_TAG_REGEXP, 'g'), '')
}
