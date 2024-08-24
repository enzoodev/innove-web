import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconMenu2, IconSettings } from '@tabler/icons-react'

import { useAuth } from '@/hooks/auth/useAuth'

import { Routes } from '@/enums/Routes'

import { appRoutes } from '@/utils/constants/appRoutes'
import { PhotoFormatter } from '@/utils/PhotoFormatter'

type SidebarModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const router = useRouter()
  const { auth, isLoadingUser } = useAuth()

  const [firstName, secondName] = auth?.name?.split(' ') ?? ['', '']
  const clientLogo = PhotoFormatter.formatUri(auth?.client_logo_icon)

  return (
    <div
      className={`fixed inset-0 z-50 flex transform transition-all duration-200 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeModal}
      />
      <div
        className={`flex relative p-2 flex-col justify-between h-full bg-cyan-950 shadow-lg transform transition-all duration-200 ${
          isOpen ? 'w-2/3' : 'w-0 overflow-hidden'
        }`}
      >
        <div
          className={`flex flex-col transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="flex self-end p-2" onClick={closeModal}>
            <IconMenu2 stroke={1.75} className="w-7 h-7 text-white" />
          </button>
          <div className="flex flex-col items-center gap-4 my-8">
            {isLoadingUser ? (
              <div className="h-24 w-24 bg-gray-300 rounded-full animate-pulse" />
            ) : (
              <Image
                src={clientLogo}
                alt="Client_logo"
                width="96"
                height="96"
                className="rounded-full"
              />
            )}
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-white break-words">
                {firstName} {secondName}
              </span>
              <span className="text-sm font-semibold text-gray-400 break-words">
                {auth?.email}
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
                        router.pathname.includes(item.name)
                          ? ' bg-gray-400 bg-opacity-20 active:bg-opacity-40'
                          : 'hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-10 active:bg-opacity-40'
                      }`}
                    onClick={closeModal}
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
          <div
            className={`h-11 w-full flex items-center gap-2 px-2 rounded cursor-pointer transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeModal}
          >
            <IconSettings
              stroke={1.5}
              className={`w-7 h-7 ${
                router.pathname.includes(Routes.CONFIG)
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            />
            <span
              className={`text-sm font-semibold ${
                router.pathname.includes(Routes.CONFIG)
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            >
              Configurações
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
