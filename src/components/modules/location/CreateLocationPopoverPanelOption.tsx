import { useMemo } from 'react'
import { IconHammer, IconMapCog, IconSettingsCog } from '@tabler/icons-react'

type Props = {
  title: string
  type: TLocationTypeKey
  description: string
  onClick: () => void
}

export const CreateLocationPopoverPanelOption: React.FC<Props> = ({
  title,
  type,
  description,
  onClick,
}) => {
  const icons: Record<TLocationTypeKey, () => JSX.Element> = useMemo(
    () => ({
      Equipamento: () => (
        <IconSettingsCog stroke={1.5} className="text-white" />
      ),
      Obra: () => <IconHammer stroke={1.5} className="text-white" />,
      Area: () => <IconMapCog stroke={1.5} className="text-white" />,
    }),
    [],
  )

  const Icon = icons[type]

  return (
    <button
      onClick={onClick}
      type="button"
      className="flex flex-row items-center gap-2 w-72 p-3 hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-40"
    >
      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-cyan-800">
        <Icon />
      </div>
      <div className="flex flex-col items-start flex-1">
        <h3 className="text-gray-700 text-base font-medium">{title}</h3>
        <p className="text-gray-600 text-left text-sm">{description}</p>
      </div>
    </button>
  )
}
