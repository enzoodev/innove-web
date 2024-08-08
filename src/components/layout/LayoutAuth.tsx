import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Footer } from './Footer'
import Link from 'next/link'

type Props = {
  headTitle: string
  children: React.ReactNode
}

export const LayoutAuth: React.NamedExoticComponent<Props> = memo(
  function Component({ headTitle, children }) {
    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div
          id="layout"
          className="min-h-screen flex flex-col justify-between items-center"
        >
          <header className="w-full py-4 flex justify-center border-b border-gray-300">
            <Link href="/auth/login">
              <Image
                src="/img/brand/innove.svg"
                alt="Innove"
                width="120"
                height="37"
              />
            </Link>
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
