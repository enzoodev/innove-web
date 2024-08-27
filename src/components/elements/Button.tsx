import React, { Fragment, memo } from 'react'

type Props = {
  title: string
  color?: string
  type?: 'button' | 'submit'
  normalText?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  additionalClasses?: string
  icon?: React.ReactNode
  onClick?: () => void
}

export const Button: React.NamedExoticComponent<Props> = memo(
  function Component({
    title,
    color = 'text-white',
    type = 'button',
    normalText = false,
    isDisabled = false,
    isLoading = false,
    additionalClasses = '',
    icon,
    onClick,
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading || isDisabled}
        className={`
          flex
          flex-row
          justify-center
          items-center
          gap-2
          py-3.5
          px-6
          rounded-lg
          ${isDisabled ? 'opacity-50' : ''}
        ${normalText ? '' : 'shadow-[0_3px_10px_rgb(0,0,0,0.2)]'}
          ${additionalClasses}
          `}
      >
        {isLoading ? (
          <output
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
          </output>
        ) : (
          <Fragment>
            <span
              className={`text-center text-base ${color} ${normalText ? 'font-medium' : 'font-bold'}`}
            >
              {title}
            </span>
            {icon && icon}
          </Fragment>
        )}
      </button>
    )
  },
)
