import React, { Fragment, memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconMenu2, IconSettings } from '@tabler/icons-react'

import { useAuth } from '@/hooks/auth/useAuth'
import { useToggle } from '@/hooks/shared/useToggle'

import { Routes } from '@/enums/Routes'

import { appRoutes } from '@/utils/constants/appRoutes'
import { FileConverter } from '@/utils/FileConverter'

import { Header } from './Header'
import { Footer } from './Footer'
import { SidebarModal } from './SiderbarModal'

type Props = {
  title: string
  headTitle: string
  children: React.ReactNode
  hasCreateButton?: boolean
  hasHeader?: boolean
  onCreate?: () => void
  headerRightComponent?: React.ReactNode
  customCreateButton?: React.ReactNode
}

export const LayoutApp: React.NamedExoticComponent<Props> = memo(
  function Component({
    title,
    headTitle,
    children,
    onCreate,
    hasCreateButton = true,
    hasHeader = true,
    headerRightComponent,
    customCreateButton,
  }) {
    const [isSidebarOpen, toggleSidebar] = useToggle()
    const { auth, isLoadingUser } = useAuth()
    const router = useRouter()

    const [firstName, secondName] = auth?.name?.split(' ') ?? ['', '']
    const clientLogo = FileConverter.formatUri(auth?.client_logo_icon)

    return (
      <Fragment>
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div id="layout" className="flex flex-col md:hidden min-h-screen">
          <div className="bg-cyan-950 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
            <button onClick={toggleSidebar}>
              <IconMenu2 stroke={1.5} className="w-8 h-8 text-white" />
            </button>
            {isLoadingUser ? (
              <div className="h-9 w-9 bg-gray-300 rounded-full animate-pulse" />
            ) : (
              <Image
                src={clientLogo}
                alt="Client_logo"
                width="36"
                height="36"
                className="rounded-full"
              />
            )}
          </div>
          <SidebarModal isOpen={isSidebarOpen} closeModal={toggleSidebar} />
          <div className="flex flex-col min-h-screen h-screen w-full p-4 bg-gray-200 overflow-auto">
            {hasHeader && (
              <Header
                title={title}
                hasCreateButton={hasCreateButton}
                onCreate={onCreate}
                rightComponent={headerRightComponent}
                customCreateButton={customCreateButton}
              />
            )}
            <main className="w-full flex-1">{children}</main>
            <Footer type="app" />
          </div>
        </div>
        <div id="layout" className="hidden md:flex min-h-screen flex-row">
          <div
            className={`flex flex-col justify-between min-h-full bg-cyan-950 shadow-lg transition-all duration-300 ${
              isSidebarOpen ? 'w-72 p-2' : 'w-20 p-4'
            }`}
          >
            <div
              className={`flex flex-col gap-4 ${isSidebarOpen ? '' : 'items-center'}`}
            >
              <button
                className={isSidebarOpen ? 'self-end mt-2 mr-2' : ''}
                onClick={toggleSidebar}
              >
                <IconMenu2 stroke={1.75} className="w-7 h-7 text-white" />
              </button>
              <div className="flex flex-col items-center gap-4">
                {isLoadingUser ? (
                  <div
                    className={`bg-gray-300 rounded-full animate-pulse ${isSidebarOpen ? 'w-24 h-24' : 'w-10 h-10'}`}
                  />
                ) : (
                  <Image
                    src={clientLogo}
                    alt="Client_logo"
                    width={isSidebarOpen ? '96' : '40'}
                    height={isSidebarOpen ? '96' : '40'}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`flex-col items-center ${
                    isSidebarOpen ? 'flex' : 'hidden'
                  }`}
                >
                  <span className="text-md font-semibold text-white break-words">
                    {firstName} {secondName}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 break-words">
                    {auth?.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <nav>
                <ul className="flex flex-col gap-2">
                  {appRoutes.map((item) => (
                    <Link href={item.name} key={item.name}>
                      <li
                        className={`h-12 w-full flex items-center gap-2 ${
                          isSidebarOpen ? 'pl-4 pr-2 rounded' : 'p-3 rounded-xl'
                        } cursor-pointer
                        ${
                          router.pathname.includes(item.name)
                            ? ' bg-gray-400 bg-opacity-20 active:bg-opacity-40'
                            : 'hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-10 active:bg-opacity-40'
                        }`}
                      >
                        {item.renderIcon({
                          className: `w-7 h-7 ${
                            router.pathname.includes(item.name)
                              ? 'text-white'
                              : 'text-gray-300'
                          }`,
                          stroke: 1.5,
                        })}
                        <span
                          className={`text-sm font-semibold ${
                            isSidebarOpen ? 'inline-block' : 'hidden'
                          } ${
                            router.pathname.includes(item.name)
                              ? 'text-white'
                              : 'text-gray-300'
                          }`}
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
              <li
                className={`h-12 w-full flex items-center gap-2 ${
                  isSidebarOpen ? 'pl-4 pr-2 rounded' : 'p-3 rounded-xl'
                } cursor-pointer
                        ${
                          router.pathname.includes(Routes.CONFIG)
                            ? ' bg-gray-400 bg-opacity-20 active:bg-opacity-40'
                            : 'hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-10 active:bg-opacity-40'
                        }`}
              >
                <IconSettings
                  className={`w-7 h-7 ${
                    router.pathname.includes(Routes.CONFIG)
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                  stroke={1.5}
                />
                <span
                  className={`text-sm font-semibold ${
                    isSidebarOpen ? 'inline-block' : 'hidden'
                  } ${
                    router.pathname.includes(Routes.CONFIG)
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  Configurações
                </span>
              </li>
            </Link>
          </div>
          <div className="flex flex-col min-h-screen h-screen w-full p-4 bg-gray-200 overflow-auto">
            {hasHeader && (
              <Header
                title={title}
                hasCreateButton={hasCreateButton}
                onCreate={onCreate}
                rightComponent={headerRightComponent}
                customCreateButton={customCreateButton}
              />
            )}
            <main className="w-full flex-1">{children}</main>
            <Footer type="app" />
          </div>
        </div>
      </Fragment>
    )
  },
)
