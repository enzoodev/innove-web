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
  return (
    <div
      className={`transition-colors duration-300 ${isOpen ? 'bg-gray-100' : 'bg-gray-200'}`}
    >
      <div>
        <h3>{title}</h3>
        {!isOpen && (
          <button type="button" onClick={onOpen}>
            Open
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
