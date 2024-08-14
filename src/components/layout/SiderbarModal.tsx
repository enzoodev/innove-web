import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'

import { useAuth } from '@/hooks/auth/useAuth'

import { Routes } from '@/enums/Routes'

import { appRoutes } from '@/utils/appRoutes'
import { PhotoFormatter } from '@/utils/PhotoFormatter'
import { IconMenu2, IconSettings, IconX } from '@tabler/icons-react'

type SidebarModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const router = useRouter()
  const { auth } = useAuth()

  if (!auth) {
    return null
  }

  const [firstName, secondName] = auth.name.split(' ')
  const clientLogo = PhotoFormatter.formatUri(auth.client_logo_icon)

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 flex"
    >
      <div
        className="fixed inset-0 bg-black/40"
        aria-hidden="true"
        onClick={closeModal}
      />
      <div className="flex relative p-2 flex-col justify-between w-2/3 h-full bg-cyan-950 shadow-lg">
        <div className="flex flex-col">
          <button className="flex self-end p-2" onClick={closeModal}>
            <IconMenu2 stroke={1.75} className="w-7 h-7 text-white" />
          </button>
          <div className="flex flex-col items-center gap-4 my-4">
            <Image
              src={clientLogo}
              alt="Client_logo"
              width="96"
              height="96"
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
                    onClick={closeModal}
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
            onClick={closeModal}
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
    </Dialog>
  )
}
