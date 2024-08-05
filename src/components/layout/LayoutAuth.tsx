import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Footer } from './Footer'

type Props = {
  title: string
  children: React.ReactNode
}

export const LayoutAuth: React.NamedExoticComponent<Props> = memo(
  function Component({ title, children }) {
    return (
      <Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <div
          id="layout"
          className="min-h-screen flex flex-col justify-between items-center"
        >
          <header className="w-full py-4 flex justify-center border-b border-gray-300">
            <a href="https://innove.com.br/">
              <Image
                src="/img/brand/innove.svg"
                alt="Rosinha"
                width="160"
                height="40"
              />
            </a>
          </header>
          <main className="w-full h-full flex items-center justify-center">
            {children}
          </main>
          <Footer />
        </div>
      </Fragment>
    )
  },
)
