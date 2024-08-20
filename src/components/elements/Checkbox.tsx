import { memo } from 'react'
import { Checkbox as HeadlessCheckbox } from '@headlessui/react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  formError?: string
  additionalClasses?: string
}

export const Checkbox: React.NamedExoticComponent<Props> = memo(
  function Component({
    label,
    checked,
    onChange,
    formError,
    additionalClasses,
  }) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <HeadlessCheckbox
            checked={checked}
            onChange={onChange}
            className={`group block size-4 rounded border bg-white data-[checked]:bg-cyan-800
            ${additionalClasses ?? ''}`}
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
          <label className="text-gray-700 text-md">{label}</label>
        </div>
        {formError && <div className="text-red-600">{formError}</div>}
      </div>
    )
  },
)
