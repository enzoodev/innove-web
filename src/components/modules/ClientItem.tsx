import React, { memo } from 'react'
import { IconDotsVertical, IconUserCircle } from '@tabler/icons-react'

type Props = {
  item: TClient
}

export const ClientItem: React.NamedExoticComponent<Props> = memo(
  function Component({ item }) {
    const [creationDate] = item.datecreate.split(' ')
    const status = item.status === '1' ? 'Ativo' : 'Inativo'

    return (
      <div className="flex flex-row items-center justify-between px-4 py-3 gap-4">
        <div className="flex flex-1 flex-row gap-4">
          <div className="w-12 h-12 flex self-start items-center justify-center bg-cyan-800 rounded-full">
            <IconUserCircle stroke={1.25} className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-1 flex-col sm:flex-row justify-between gap-3 sm:gap-4">
            <div className="flex flex-1 flex-col">
              <span className="text-gray-700 break-word sm:max-w-none text-base font-bold break-words">
                {item.name}
              </span>
              <span className="text-gray-600 text-sm">{creationDate}</span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-gray-600 text-base">Status</span>
                <span className="text-gray-600 text-base font-semibold">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
        >
          <IconDotsVertical stroke={1.5} className="text-gray-800" />
        </button>
      </div>
    )
  },
)
