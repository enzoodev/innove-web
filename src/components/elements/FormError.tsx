import { memo } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'

type Props = {
  message?: string
}

export const FormError: React.NamedExoticComponent<Props> = memo(
  function Component({ message }) {
    if (!message) return null

    return (
      <div className="flex flex-row items-center gap-2">
        <IconAlertCircle stroke={1.75} className="text-red-700" />
        <span className="text-red-700 text-sm font-medium">{message}</span>
      </div>
    )
  },
)
