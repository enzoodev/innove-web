import React, { memo, useCallback } from 'react'
import { Input } from '../elements/Input'
import { IconPlus } from '@tabler/icons-react'

type Props = {
  title: string
  searchText: string
  setSearchText: (text: string) => void
}

export const Header: React.NamedExoticComponent<Props> = memo(
  function Component({ title, searchText, setSearchText }) {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
      },
      [setSearchText],
    )

    return (
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <IconPlus stroke={1.75} className="w-7 h-7 text-white" />
          </button>
        </div>
        <div className="w-full sm:w-72 lg:w-96">
          <Input
            placeholder="Qual cliente você procura?"
            hasLabel={false}
            value={searchText}
            onChange={handleChange}
            aria-label="Search"
            autoFocus
            spellCheck={false}
            additionalClasses="bg-gray-300 placeholder-gray-500"
          />
        </div>
      </header>
    )
  },
)
