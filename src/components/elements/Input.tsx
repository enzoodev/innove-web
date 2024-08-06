import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
} from 'react'
import { type Path, type UseFormRegister } from 'react-hook-form'

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
  register?: UseFormRegister<any>
}

export const Input: React.NamedExoticComponent<Props> = memo(
  function Component({
    placeholder,
    formError,
    hasLabel = true,
    type = 'text',
    name,
    register,
    ...rest
  }) {
    const registerData = register && name ? register(name) : {}

    function Field() {
      return (
        <div className="flex flex-col gap-2 w-full">
          <input
            type={type}
            placeholder={placeholder}
            className="border
              border-gray-300
              bg-gray-200
              py-3
              px-4
              rounded-lg
              text-gray-700
              text-md
              placeholder-gray-400
              selection:bg-gray-400
              focus:border-gray-400
              hover:border-gray-400"
            {...rest}
            {...registerData}
          />
          {formError && <FormError message={formError} />}
        </div>
      )
    }

    if (!hasLabel) {
      return <Field />
    }

    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-700 text-md font-semibold">
          {placeholder}
        </label>
        <Field />
      </div>
    )
  },
)
