import { IWord } from '@/types/word'
import { CSSProperties } from 'react'

export interface WordProps {
  word: IWord
}
export default function Word({ word }: WordProps) {
  let baseSize = 40
  if (window.innerWidth > 480) {
    baseSize = 60
  }
  if (window.innerWidth > 640) {
    baseSize = 80
  }
  if (window.innerWidth > 768) {
    baseSize = 100
  }
  if (window.innerWidth > 1024) {
    baseSize = 140
  }
  const styles: CSSProperties = {
    fontSize: `${word.weight * baseSize}px`,
  }
  return (
    <div style={styles} className="leading-tight">
      {word.word}
    </div>
  )
}
