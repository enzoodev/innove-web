import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useToggle } from '@/hooks/useToggle'

import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  title: string
  headTitle: string
  children: React.ReactNode
}

export const LayoutApp: React.NamedExoticComponent<Props> = memo(
  function Component({ title, headTitle, children }) {
    const [isOpen, toggleOpen] = useToggle()

    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div id="layout" className="min-h-screen flex flex-row">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <Link href="/clients">
                <Image
                  src="/img/brand/innove.svg"
                  alt="Innove"
                  width="160"
                  height="40"
                />
              </Link>
              <nav>
                <ul>
                  <li>
                    <Link href="/clients"></Link>
                  </li>
                  <li>
                    <Link href="/users"></Link>
                  </li>
                  <li>
                    <Link href="/locations"></Link>
                  </li>
                  <li>
                    <Link href="/checklits"></Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="flex flex-row w-full h-full">
            <Header title={title} />
            <main className="w-full h-full">{children}</main>
          </div>
          <Footer />
        </div>
      </Fragment>
    )
  },
)
