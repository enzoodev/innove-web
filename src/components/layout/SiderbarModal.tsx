import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'

import { appRoutes } from '@/utils/appRoutes'

type SidebarModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const router = useRouter()

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 flex"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        onClick={closeModal}
      />

      <div className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-lg">
        <button
          type="button"
          className="absolute top-4 right-4"
          onClick={closeModal}
        >
          <IconX stroke={1.5} className="w-6 h-6 text-gray-700" />
        </button>
        <nav className="py-4 px-4 border-y border-gray-300">
          <ul className="flex flex-col gap-4">
            {appRoutes.map((item) => (
              <Link href={item.name} key={item.name}>
                <li
                  className={`h-10 w-full flex items-center gap-2 px-2 rounded cursor-pointer
                  ${
                    router.pathname === item.name
                      ? 'bg-cyan-700 text-white'
                      : 'hover:bg-cyan-700 hover:bg-opacity-10 text-gray-700'
                  }`}
                  onClick={closeModal}
                >
                  {item.renderIcon({
                    className: `w-6 h-6 ${
                      router.pathname === item.name
                        ? 'text-white'
                        : 'text-gray-700'
                    }`,
                    stroke: 1.5,
                  })}
                  <span className="text-md font-medium">{item.label}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </Dialog>
  )
}
