import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { IWord } from '@/types/word'
import Word from '@/features/Word/Word'
import classNames from 'classnames'
import { getWordsMatrix } from '@/features/Word/utils'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [words, setWords] = useState<IWord[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/words')
      .then((res) => res.json())
      .then((data) => {
        setWords(data.words)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setLoading(false))
  }, [])

  const wordsMatrix = words && getWordsMatrix(words)

  return (
    <>
      <Head>
        <title>Twitter Word Cloud</title>
        <meta
          name="description"
          content="Hottest topics on Twitter right now."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classNames(styles.main, inter.className)}>
        {isLoading && <div>Loading...</div>}

        {wordsMatrix && (
          <div className="flex flex-col justify-center items-center flex-1">
            {wordsMatrix.map((words, index) => (
              <div className="flex gap-0.5" key={index}>
                {words
                  .filter((word) => !!word)
                  .map((word) => (
                    <Word word={word} key={word.word} />
                  ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
