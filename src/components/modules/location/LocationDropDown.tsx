import { useCallback } from 'react'
import { IconChevronDown } from '@tabler/icons-react'

type Props = {
  title: string
  isOpen: boolean
  onOpen: () => void
  children: React.ReactNode
}

export const LocationDropDown: React.FC<Props> = ({
  title,
  isOpen,
  onOpen,
  children,
}) => {
  const handleOpen = useCallback(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div>
      <div
        className="flex flex-row items-center justify-between py-2 px-4 border-b border-gray-300
        hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-40 cursor-pointer"
        onClick={handleOpen}
      >
        <h3 className="text-gray-800 text-md font-semibold">{title}</h3>
        {!isOpen && (
          <button
            type="button"
            onClick={handleOpen}
            className="w-10 h-10 bg-gray-300 border border-gray-400 rounded-full flex items-center justify-center"
          >
            <IconChevronDown stroke={1.5} className="text-gray-700 w-7 h-7" />
          </button>
        )}
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out 
        ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="bg-gray-200 p-4">
          <div className="bg-gray-100 rounded-md border border-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
