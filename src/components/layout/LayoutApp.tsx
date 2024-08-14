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
import { IconMenu2, IconSettings } from '@tabler/icons-react'
import { useToggle } from '@/hooks/shared/useToggle'
import { SidebarModal } from './SiderbarModal'

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
    const [isSidebarOpen, toggleSidebar] = useToggle()
    const router = useRouter()
    const { auth } = useAuth()

    if (!auth) {
      return null
    }

    const [firstName, secondName] = auth.name.split(' ')
    const clientLogo = PhotoFormatter.formatUri(auth.client_logo_icon)

    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div id="layout" className="flex flex-col md:hidden min-h-screen">
          <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-center relative">
            <button
              className="absolute bottom-3.5 left-4"
              onClick={toggleSidebar}
            >
              <IconMenu2 stroke={1.5} className="w-8 h-8 text-gray-700" />
            </button>
            <Link href="/clients">
              <Image
                src="/img/brand/innove.svg"
                alt="Innove"
                width="130"
                height="37"
              />
            </Link>
          </div>
          <SidebarModal isOpen={isSidebarOpen} closeModal={toggleSidebar} />
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
          <div className="flex relative p-2 flex-col justify-between w-2/4 h-full bg-cyan-950 shadow-lg">
            <div className="flex flex-col">
              <button className="flex self-end p-2" onClick={toggleSidebar}>
                <IconMenu2 stroke={1.75} className="w-7 h-7 text-white" />
              </button>
              <div className="flex flex-col items-center gap-4 my-4">
                <Image
                  src={clientLogo}
                  alt="Client_logo"
                  width="72"
                  height="72"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-white break-words">
                    {firstName} {secondName}
                  </span>
                  <span className="text-sm font-medium text-gray-400 break-words">
                    {auth.email}
                  </span>
                </div>
              </div>
              <span className="mt-10 mb-3 ml-2 text-md font-semibold text-gray-100">
                Navegação
              </span>
              <nav>
                <ul className="flex flex-col gap-3">
                  {appRoutes.map((item) => (
                    <Link href={item.name} key={item.name}>
                      <li
                        className={`h-12 w-full flex items-center gap-2 pl-4 pr-2 rounded cursor-pointer
                  ${
                    router.pathname === item.name
                      ? ' bg-gray-400 bg-opacity-20 active:bg-opacity-40'
                      : 'hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-10 active:bg-opacity-40'
                  }`}
                        onClick={toggleSidebar}
                      >
                        {item.renderIcon({
                          className: `w-7 h-7 ${
                            router.pathname === item.name
                              ? 'text-white'
                              : 'text-gray-300'
                          }`,
                          stroke: 1.5,
                        })}
                        <span
                          className={`text-md font-medium ${router.pathname === item.name ? 'text-white' : 'text-gray-300'}`}
                        >
                          {item.label}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
            <Link href={Routes.CONFIG}>
              <div
                className={`h-11 w-full flex items-center gap-2 px-2 rounded cursor-pointer
                  ${
                    router.pathname === Routes.CONFIG
                      ? ' bg-gray-400 bg-opacity-20 active:bg-opacity-40'
                      : 'hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-10 active:bg-opacity-40'
                  }`}
                onClick={toggleSidebar}
              >
                <IconSettings
                  stroke={1.5}
                  className={`w-7 h-7 ${router.pathname === Routes.CONFIG ? 'text-white' : 'text-gray-300'}`}
                />
                <span
                  className={`text-md font-medium ${router.pathname === Routes.CONFIG ? 'text-white' : 'text-gray-300'}`}
                >
                  Configurações
                </span>
              </div>
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
