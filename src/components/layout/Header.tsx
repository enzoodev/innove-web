import React, { memo, useCallback } from 'react'
import { IconPlus } from '@tabler/icons-react'

type Props = {
  title: string
  hasCreateButton?: boolean
  onCreate?: () => void
  rightComponent?: React.ReactNode
  customCreateButton?: React.ReactNode
}

export const Header: React.NamedExoticComponent<Props> = memo(
  function Component({
    title,
    hasCreateButton = true,
    onCreate,
    rightComponent,
    customCreateButton,
  }) {
    const renderCreateButton = useCallback(() => {
      if (customCreateButton) {
        return customCreateButton
      }

      if (!hasCreateButton) {
        return null
      }

      return (
        <button
          onClick={onCreate}
          type="button"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <IconPlus stroke={1.75} className="w-7 h-7 text-white" />
        </button>
      )
    }, [customCreateButton, hasCreateButton, onCreate])

    return (
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-row items-center justify-between sm:justify-start gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {renderCreateButton()}
        </div>
        {rightComponent && rightComponent}
      </header>
    )
  },
)
