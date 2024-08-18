import React, { memo } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { IconX } from '@tabler/icons-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export const Modal: React.NamedExoticComponent<Props> = memo(
  function Component({ isOpen, onClose, title, children, footer }) {
    return (
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-gray-50 border border-gray-300 shadow-lg rounded-xl">
                  <div className="w-full flex flex-row items-center justify-between py-3 px-4 border-b border-gray-300">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>
                    <button type="button" onClick={onClose}>
                      <IconX stroke={1.5} className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
                  <div className="p-4">{children}</div>
                  {footer && (
                    <div className="w-full flex p-4 gap-4 justify-end border-t border-gray-300">
                      {footer}
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  },
)
