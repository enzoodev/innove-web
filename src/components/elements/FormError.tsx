import { IconAlertOctagon } from '@tabler/icons-react'
import { memo } from 'react'

type Props = {
  message?: string
}

export const FormError: React.NamedExoticComponent<Props> = memo(
  function Component({ message }) {
    if (!message) return null

    return (
      <span className="form-control-error">
        <IconAlertOctagon className="ic ic--increment" />
        <span>{message}</span>
      </span>
    )
  },
)
