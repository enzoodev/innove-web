import { HTMLInputTypeAttribute, memo } from 'react'
import ReactInputMask from 'react-input-mask'

import { FormError } from './FormError'

type MaskInputProps = {
  placeholder: string
  formError?: string
  hasLabel?: boolean
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  additionalClasses?: string
  isLoading?: boolean
  button?: React.ReactNode
  mask: string
}

type MaskFieldProps = {
  placeholder: string
  formError?: string
  isLoading: boolean
  additionalClasses?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  button: React.ReactNode
  mask: string
}

function MaskField({
  placeholder,
  isLoading,
  formError,
  additionalClasses,
  value,
  onChange,
  type,
  button,
  mask,
}: Readonly<MaskFieldProps>) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full animate-pulse">
        <div className="h-12 bg-gray-300 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-3 w-full">
        <ReactInputMask
          mask={mask}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`border
              border-gray-300
              ${formError ? 'border-l-4 border-red-600' : 'hover:border-gray-400 focus:border-gray-400'}
              bg-gray-200
              py-3
              px-4
              rounded-lg
              text-gray-700
              text-base
              w-full
              placeholder-gray-400
              selection:bg-gray-400
              ${additionalClasses ?? ''}`}
        />
        {button && button}
      </div>
      {formError && <FormError message={formError} />}
    </div>
  )
}

export const MaskInput: React.NamedExoticComponent<MaskInputProps> = memo(
  function Component({
    placeholder,
    formError,
    hasLabel = true,
    type = 'text',
    value,
    onChange,
    additionalClasses,
    isLoading = false,
    button,
    mask,
    ...rest
  }) {
    if (!hasLabel) {
      return (
        <MaskField
          placeholder={placeholder}
          isLoading={isLoading}
          formError={formError}
          additionalClasses={additionalClasses}
          value={value}
          onChange={onChange}
          type={type}
          button={button}
          mask={mask}
          {...rest}
        />
      )
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-700 text-base font-semibold">
          {placeholder}
        </label>
        <MaskField
          placeholder={placeholder}
          isLoading={isLoading}
          formError={formError}
          additionalClasses={additionalClasses}
          value={value}
          onChange={onChange}
          type={type}
          button={button}
          mask={mask}
          {...rest}
        />
      </div>
    )
  },
)
