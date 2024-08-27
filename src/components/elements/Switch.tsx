import { memo } from 'react'
import { Switch as HeadlessuiSwitch } from '@headlessui/react'

type Props = {
  isChecked: boolean
  onChange: (checked: boolean) => void
}

export const Switch: React.NamedExoticComponent<Props> = memo(
  function Component({ isChecked, onChange }) {
    return (
      <HeadlessuiSwitch
        checked={isChecked}
        onChange={onChange}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full p-1 bg-gray-400 bg-opacity-60
        transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[checked]:bg-cyan-800"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
        />
      </HeadlessuiSwitch>
    )
  },
)
