import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/auth/useAuth'
import { Routes } from '@/enums/Routes'

import { appRoutes } from '@/utils/appRoutes'
import { PhotoFormatter } from '@/utils/PhotoFormatter'

import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  title: string
  headTitle: string
  searchText: string
  setSearchText: (text: string) => void
  children: React.ReactNode
}

export const LayoutApp: React.NamedExoticComponent<Props> = memo(
  function Component({
    title,
    headTitle,
    searchText,
    setSearchText,
    children,
  }) {
    const router = useRouter()
    const { auth } = useAuth()

    if (!auth) {
      return null
    }

    const [firstName] = auth.name.split(' ')
    const clientLogo = PhotoFormatter.formatUri(auth.client_logo_icon)

    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div id="layout" className="flex md:hidden min-h-screen flex-row">
          <div></div>
          <div className="flex flex-col min-h-screen h-screen w-full p-4 bg-gray-200 overflow-auto">
            <Header
              title={title}
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <main className="w-full flex-1">{children}</main>
            <Footer type="app" />
          </div>
        </div>
        <div id="layout" className="hidden md:flex min-h-screen flex-row">
          <div className="sticky top-0 left-0 flex flex-col items-center justify-between p-4 bg-gray-100 border-r border-gray-300">
            <div className="flex flex-col gap-4">
              <Link href="/clients">
                <Image
                  src="/img/brand/innove.svg"
                  alt="Innove"
                  width="140"
                  height="40"
                />
              </Link>
              <nav className="py-4 w-40 border-y border-gray-300">
                <ul className="flex flex-col gap-2">
                  {appRoutes.map((item) => (
                    <Link href={item.name} key={item.name}>
                      <li
                        className={`h-10 w-full flex flex-row gap-2 px-2 items-center rounded
                          ${router.pathname === item.name ? ' bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 bg-opacity-20 hover:bg-opacity-20 active:bg-opacity-20' : 'hover:bg-cyan-700 hover:bg-opacity-5'}`}
                      >
                        {item.renderIcon({
                          className: `w-7 h-7 ${
                            router.pathname === item.name
                              ? 'text-cyan-700'
                              : 'text-gray-700'
                          }`,
                          stroke: 1.5,
                        })}
                        <span
                          className={`text-md font-medium ${router.pathname === item.name ? 'text-cyan-700' : 'text-gray-700'}`}
                        >
                          {item.label}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
            <Link
              href={Routes.CLIENTS}
              className="w-full flex flex-row items-center gap-3"
            >
              <Image
                src={clientLogo}
                alt="Client_logo"
                width="48"
                height="48"
                className="rounded-full"
              />
              <span className="max-w-28 text-md font-medium text-gray-700 break-words">
                {firstName}
              </span>
            </Link>
          </div>
          <div className="flex flex-col min-h-screen h-screen w-full p-4 bg-gray-200 overflow-auto">
            <Header
              title={title}
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <main className="w-full flex-1">{children}</main>
            <Footer type="app" />
          </div>
        </div>
      </Fragment>
    )
  },
)
