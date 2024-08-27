import { Checkbox as HeadlessCheckbox } from '@headlessui/react'

import { FormError } from './FormError'

type CheckboxOption = {
  label: string
  value: string
  isActive: boolean
}

type Props = {
  options: CheckboxOption[]
  onSelectItem: (index: number) => void
  formError?: string
  hasLabel?: boolean
  placeholder?: string
  isLoading?: boolean
}

export const CheckboxGroup: React.FC<Props> = function Component({
  options,
  onSelectItem,
  formError,
  hasLabel = true,
  placeholder,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {hasLabel && (
          <label className="text-gray-700 text-base font-semibold">
            {placeholder}
          </label>
        )}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-2 animate-pulse">
            <div className="h-6 w-6 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-48" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {hasLabel && (
        <label className="text-gray-700 text-base font-semibold">
          {placeholder}
        </label>
      )}
      {options.map(({ label, value, isActive }, index) => (
        <button key={value} type="button" className="flex items-center gap-2">
          <HeadlessCheckbox
            checked={isActive}
            onChange={() => onSelectItem(index)}
            className="group block size-6 p-1 rounded border bg-white data-[checked]:bg-cyan-800"
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
          <label
            htmlFor={value}
            className="text-gray-700 text-base active:opacity-70"
            onClick={() => onSelectItem(index)}
          >
            {label}
          </label>
        </button>
      ))}
      {formError && <FormError message={formError} />}
    </div>
  )
}
