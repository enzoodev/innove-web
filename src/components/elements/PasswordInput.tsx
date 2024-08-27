import { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react'
import { type Path, type UseFormRegister } from 'react-hook-form'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

import { useToggle } from '@/hooks/shared/useToggle'

import { FormError } from './FormError'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type Props = InputProps & {
  placeholder: string
  formError?: string
  hasLabel?: boolean
  name?: Path<any>
  register?: UseFormRegister<any>
}

export const PasswordInput: React.NamedExoticComponent<Props> = memo(
  function Component({
    placeholder,
    formError,
    hasLabel = true,
    name,
    register,
    ...rest
  }) {
    const [isShowPassword, toggleShowPassword] = useToggle()
    const registerData = register && name ? register(name) : {}

    function Field() {
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row justify-between gap-4 pr-4 w-full border border-gray-300 bg-gray-200 rounded-lg hover:border-gray-400">
            <input
              type={isShowPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className="w-full py-3 px-4 bg-transparent text-gray-700 text-base placeholder-gray-400"
              {...rest}
              {...registerData}
            />
            <button type="button" onClick={toggleShowPassword}>
              {isShowPassword ? (
                <IconEye stroke={1.5} className="text-gray-600" />
              ) : (
                <IconEyeOff stroke={1.5} className="text-gray-600" />
              )}
            </button>
          </div>
          {formError && <FormError message={formError} />}
        </div>
      )
    }

    if (!hasLabel) {
      return <Field />
    }

    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-700 text-base font-semibold">
          {placeholder}
        </label>
        <Field />
      </div>
    )
  },
)
