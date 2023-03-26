import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { IWord } from '@/types/word'
import Word from '@/features/Word/Word'
import classNames from 'classnames'
import { getWordsMatrix } from '@/features/Word/utils'
import Input from '@/components/Input'
import { DEFAULT_RSS_FEED } from '@/constants/defaults'
import { fetchWords } from '@/features/Word/api'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [words, setWords] = useState<IWord[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rssFeed, setRssFeed] = useState<string>(DEFAULT_RSS_FEED)

  useEffect(() => {
    setLoading(true)
    fetchWords(rssFeed)
      .then((words) => setWords(words))
      .catch((error) => {
        console.log(error)
        setError(error.message)
      })
      .finally(() => setLoading(false))
  }, [rssFeed])

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
      <div>
        {error && (
          <div className="bg-red-500 p-2 text-white flex justify-between items-center">
            <p>{error}</p>
            <button
              className="font-bold block hover:text-gray-100"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        <main className={classNames(styles.main, inter.className)}>
          {isLoading && <div>Loading...</div>}

          <Input
            type="text"
            placeholder="https://something.com/rss.xml"
            label="RSS Feed"
            value={rssFeed}
            onChange={(e) => setRssFeed(e.target.value)}
          />

          {wordsMatrix && (
            <div className="flex flex-col items-center justify-center flex-1">
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
      </div>
    </>
  )
}
