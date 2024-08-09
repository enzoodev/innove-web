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
      <div className="flex flex-row items-center justify-between p-4">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-cyan-800 rounded-full">
              <IconUserCircle stroke={1.5} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700 text-base font-bold">
                {item.name}
              </span>
              <span className="text-gray-600 text-sm">{creationDate}</span>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-base">Status</span>
              <span className="text-gray-600 text-base font-semibold">
                {status}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-base">Cnpj</span>
              <span className="text-gray-600 text-base font-semibold">
                {item.cnpj}
              </span>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full">
          <IconDotsVertical stroke={1.5} className="text-gray-800" />
        </div>
      </div>
    )
  },
)