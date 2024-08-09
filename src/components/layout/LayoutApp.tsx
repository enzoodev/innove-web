import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useAuth } from '@/hooks/useAuth'

import { PhotoFormatter } from '@/utils/PhotoFormatter'

import { Footer } from './Footer'
import { Header } from './Header'
import { useRouter } from 'next/router'
import { appRoutes } from '@/utils/appRoutes'
import { Routes } from '@/enums/Routes'
import { IconSettings } from '@tabler/icons-react'

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

    const clientLogo = PhotoFormatter.formatUri(auth.client_logo_icon)

    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div id="layout" className="min-h-screen flex flex-row">
          <div className="flex flex-col items-center justify-between p-4 bg-gray-100 border-r border-gray-300">
            <div className="flex flex-col gap-4">
              <Link href="/clients">
                <Image
                  src={clientLogo}
                  alt="Client_logo"
                  width="54"
                  height="54"
                  className="rounded-full"
                />
              </Link>
              <nav className="py-4 border-y border-gray-300">
                <ul className="flex flex-col items-center gap-2">
                  {appRoutes.map((item) => (
                    <Link href={item.name} key={item.name}>
                      <li
                        className={`w-10 h-10 flex items-center justify-center rounded
                          ${router.pathname === item.name ? ' bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 bg-opacity-20 hover:bg-opacity-20 active:bg-opacity-20' : ''}`}
                      >
                        {item.renderIcon({
                          className: `w-7 h-7 ${
                            router.pathname === item.name
                              ? 'text-cyan-700 hover:text-cyan-800 active:text-cyan-900'
                              : 'text-gray-700 hover:text-gray-800 active:text-gray-900'
                          }`,
                          stroke: 1.5,
                        })}
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
            <Link href={Routes.CLIENTS}>
              <IconSettings
                stroke={1.5}
                className="w-7 h-7 text-gray-700 hover:text-gray-800 active:text-gray-900"
              />
            </Link>
          </div>
          <div className="flex flex-col min-h-screen w-full p-4 bg-gray-200">
            <Header
              title={title}
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <main className="w-full h-full">{children}</main>
            <Footer type="app" />
          </div>
        </div>
      </Fragment>
    )
  },
)
