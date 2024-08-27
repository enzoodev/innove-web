import { memo } from 'react'
import { Checkbox as HeadlessCheckbox } from '@headlessui/react'

type Props = {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  formError?: string
  isLoading?: boolean
}

export const Checkbox: React.NamedExoticComponent<Props> = memo(
  function Component({
    label,
    description,
    checked,
    onChange,
    formError,
    isLoading = false,
  }) {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-700 text-base font-semibold">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse" />
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-gray-700 text-base font-semibold">{label}</label>
        <div className="flex flex-col gap-2 w-full">
          <button type="button" className="flex items-center gap-2">
            <HeadlessCheckbox
              checked={checked}
              onChange={onChange}
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
              className="text-gray-700 text-base active:opacity-70"
              onClick={() => onChange(!checked)}
            >
              {description}
            </label>
          </button>
          {formError && <div className="text-red-600">{formError}</div>}
        </div>
      </div>
    )
  },
)
