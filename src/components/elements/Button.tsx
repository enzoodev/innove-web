import { memo } from 'react'

type Props = {
  title: string
  color?: string
  type?: 'button' | 'submit'
  itsCancelButton?: boolean
  isLoading?: boolean
  additionalClasses?: string
  onClick?: () => void
}

export const Button: React.NamedExoticComponent<Props> = memo(
  function Component({
    title,
    color = 'text-white',
    type = 'button',
    itsCancelButton = false,
    isLoading = false,
    additionalClasses = '',
    onClick,
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading}
        className={`
          flex
          flex-row
          justify-center
          items-center
          py-3.5
          px-6
          rounded-lg
        ${itsCancelButton ? '' : 'shadow-[0_3px_10px_rgb(0,0,0,0.2)]'}
          ${additionalClasses}
          `}
      >
        {isLoading ? (
          <div
            role="status"
            className="inline-block
            h-6
            w-6
            animate-spin
            rounded-full
            border-2
            border-solid
            border-current
            border-e-transparent
            align-[-0.125em]
            text-surface
            motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          <span
            className={`text-center text-md ${color} ${itsCancelButton ? 'font-medium' : 'font-bold'}`}
          >
            {title}
          </span>
        )}
      </button>
    )
  },
)
