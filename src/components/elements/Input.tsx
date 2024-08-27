import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  useCallback,
} from 'react'
import { type Path } from 'react-hook-form'

import { FormError } from './FormError'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type Props = InputProps & {
  placeholder: string
  formError?: string
  hasLabel?: boolean
  type?: HTMLInputTypeAttribute
  name?: Path<any>
  register?: any
  additionalClasses?: string
  isLoading?: boolean
  button?: React.ReactNode
  masks?: Array<string>
}

export const Input: React.NamedExoticComponent<Props> = memo(
  function Component({
    placeholder,
    formError,
    hasLabel = true,
    type = 'text',
    name,
    register,
    additionalClasses,
    isLoading = false,
    button,
    masks,
    ...rest
  }) {
    const getRegister = useCallback(() => {
      if (!register || !name) {
        return {}
      }

      if (masks) {
        return register(name, masks)
      }

      return register(name)
    }, [masks, name, register])

    function Field() {
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
            <input
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
              {...rest}
              {...getRegister()}
            />
            {button && button}
          </div>
          {formError && <FormError message={formError} />}
        </div>
      )
    }

    if (!hasLabel) {
      return <Field />
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-700 text-base font-semibold">
          {placeholder}
        </label>
        <Field />
      </div>
    )
  },
)
