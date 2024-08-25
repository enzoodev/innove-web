import React, { memo } from 'react'
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUserCircle,
} from '@tabler/icons-react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'

type Props = {
  item: TClient
  onUpdate: () => void
  onDelete: () => void
}

export const ClientItem: React.NamedExoticComponent<Props> = memo(
  function Component({ item, onUpdate, onDelete }) {
    const [creationDate] = item.datecreate.split(' ')
    const status = item.status === '1' ? 'Ativo' : 'Inativo'

    return (
      <div
        className="
            flex flex-row items-center justify-between px-4 py-3 gap-4
            active:bg-gray-200 active:bg-opacity-60
            hover:bg-gray-200 hover:bg-opacity-30
            "
        onClick={onUpdate}
      >
        <div className="flex flex-1 flex-row gap-4">
          <div className="w-12 h-12 flex self-start items-center justify-center bg-cyan-800 rounded-full">
            <IconUserCircle stroke={1.25} className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-1 flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-1 flex-col">
              <span className="text-gray-700 break-word sm:max-w-none text-base font-bold break-words">
                {item.name}
              </span>
              <span className="text-gray-600 text-sm">{creationDate}</span>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm lg:text-base">
                  Status
                </span>
                <span className="text-gray-600 text-sm lg:text-base font-semibold">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Menu as="div" className="relative">
          <MenuButton
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-opacity-70 bg-gray-300 hover:bg-opacity-90 active:bg-opacity-100"
          >
            <IconDotsVertical stroke={1.5} className="text-gray-900" />
          </MenuButton>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 w-40 mt-2 origin-top-right bg-gray-200 border border-gray-300 divide-y divide-gray-300 rounded-md shadow-lg outline-none z-50">
              <MenuItem>
                <button
                  type="button"
                  className={`hover:bg-gray-300 hover:bg-opacity-30 active:bg-gray-300 active:bg-opacity-60 flex flex-row gap-2 items-center w-full px-4 py-2.5`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdate()
                  }}
                >
                  <IconEdit stroke={1.5} className="w-5 h-5 text-gray-700" />
                  <span className="text-sm text-gray-700">Editar</span>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className={`hover:bg-gray-300 hover:bg-opacity-30 active:bg-gray-300 active:bg-opacity-60 flex flex-row gap-2 items-center w-full px-4 py-2`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  <IconTrash stroke={1.5} className="w-5 h-5 text-gray-700" />
                  <span className="text-sm text-gray-700">Excluir</span>
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    )
  },
)
