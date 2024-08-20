import { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react'
import { Checkbox as HeadlessCheckbox } from '@headlessui/react'

import { FormError } from './FormError'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type CheckboxOption = {
  label: string
  value: string
  isActive: boolean
}

type Props = InputProps & {
  options: CheckboxOption[]
  onSelectItem: (index: number) => void
  formError?: string
  hasLabel?: boolean
  placeholder?: string
  additionalClasses?: string
}

export const CheckboxGroup: React.NamedExoticComponent<Props> = memo(
  function Component({
    options,
    onSelectItem,
    formError,
    hasLabel = true,
    placeholder,
    additionalClasses,
    ...rest
  }) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {hasLabel && (
          <label className="text-gray-700 text-md font-semibold">
            {placeholder}
          </label>
        )}
        {options.map(({ label, value, isActive }, index) => (
          <div key={value} className="flex items-center gap-2">
            <HeadlessCheckbox
              checked={isActive}
              onChange={() => onSelectItem(index)}
              className="group block size-4 rounded border bg-white data-[checked]:bg-cyan-800"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HeadlessCheckbox>
            <label htmlFor={value} className="text-gray-700 text-md">
              {label}
            </label>
          </div>
        ))}
        {formError && <FormError message={formError} />}
      </div>
    )
  },
)
