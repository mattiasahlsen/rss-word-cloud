import { IWord } from '@/types/word'
import { CSSProperties } from 'react'

export interface WordProps {
  word: IWord
}
export default function Word({ word }: WordProps) {
  const styles: CSSProperties = {
    fontSize: `${word.weight * 30}px`,
  }
  return (
    <div style={styles} className="leading-tight">
      {word.word}
    </div>
  )
}
