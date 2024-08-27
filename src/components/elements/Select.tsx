import { DetailedHTMLProps, HTMLAttributes, memo, useCallback } from 'react'
import { type Path } from 'react-hook-form'

import { FormError } from './FormError'

type SelectProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type Props = SelectProps & {
  placeholder: string
  formError?: string
  hasLabel?: boolean
  name?: Path<any>
  register?: any
  additionalClasses?: string
  isLoading?: boolean
  value?: string
  options: Array<{ value: string; label: string }>
}

export const Select: React.NamedExoticComponent<Props> = memo(
  function Component({
    placeholder,
    formError,
    hasLabel = true,
    name,
    register,
    additionalClasses,
    isLoading = false,
    value,
    options,
    ...rest
  }) {
    const getRegister = useCallback(() => {
      if (!register || !name) {
        return {}
      }

      return register(name)
    }, [name, register])

    function Field() {
      if (isLoading) {
        return (
          <div className="flex flex-col gap-2 w-full animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg" />
          </div>
        )
      }

      return (
        <div className="relative flex flex-col gap-2 w-full">
          <select
            className={`border
              border-gray-300
              ${formError ? 'border-l-4 border-red-600' : 'hover:border-gray-400 focus:border-gray-400'}
              bg-gray-200
              py-3
              px-4
              pr-10
              rounded-lg
              text-gray-700
              text-md
              appearance-none
              ${additionalClasses ?? ''}
              ${!value ? 'opacity-50' : ''}
            `}
            {...rest}
            {...getRegister()}
          >
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
          {formError && <FormError message={formError} />}
        </div>
      )
    }

    if (!hasLabel) {
      return <Field />
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-700 text-md font-semibold">
          {placeholder}
        </label>
        <Field />
      </div>
    )
  },
)
