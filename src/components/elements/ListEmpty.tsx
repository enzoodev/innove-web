import { memo } from 'react'

type Props = {
  title: string
  renderIcon: () => JSX.Element
}

export const ListEmpty: React.NamedExoticComponent<Props> = memo(
  function Component({ title, renderIcon }) {
    return (
      <div className="flex flex-row items-center p-4 gap-4 rounded-md border bg-gray-300 border-gray-400">
        {renderIcon()}
        <p className="text-gray-700 text-md">{title}</p>
      </div>
    )
  },
)
