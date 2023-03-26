import { IWord } from '@/types/word'

type Direction = 'right' | 'down' | 'left' | 'up'

export function getWordsMatrix(words: IWord[]): IWord[][] {
  let len = Math.floor(Math.sqrt(words.length)) + 1

  const matrix: IWord[][] = Array.from({ length: len }).map(() =>
    Array.from({ length: len })
  )

  const sortedWords = words.slice().sort((a, b) => b.weight - a.weight)

  let spaceFromCenter = 0
  while (sortedWords.length > 0) {
    const positions = getPositions(spaceFromCenter, len)
    const words = sortedWords.splice(0, positions.length)

    positions.forEach((position, index) => {
      const [rowIndex, columnIndex] = position

      if (words[index]) {
        matrix[rowIndex][columnIndex] = words[index]
      }
    })

    spaceFromCenter += 1
  }

  return matrix
}

function getSpaceFromCenter(
  rowIndex: number,
  columnIndex: number,
  len: number
): number {
  const center = len / 2 - 0.5

  return Math.floor(
    Math.max(Math.abs(center - rowIndex), Math.abs(center - columnIndex))
  )
}

/**
 * Get all positions in the matrix that are at the given distance from the center
 * The matrix is a square matrix.
 */
function getPositions(
  spaceFromCenter: number,
  matrixLen: number
): [number, number][] {
  const positions: [number, number][] = []

  for (let i = 0; i < matrixLen; i++) {
    for (let j = 0; j < matrixLen; j++) {
      if (getSpaceFromCenter(i, j, matrixLen) === spaceFromCenter) {
        positions.push([i, j])
      }
    }
  }

  return positions
}
