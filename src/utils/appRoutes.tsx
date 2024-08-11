import {
  IconChecklist,
  IconHammer,
  IconProps,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react'
import { Routes } from '@/enums/Routes'

export const appRoutes = [
  {
    name: Routes.CLIENTS,
    label: 'Clientes',
    renderIcon: (props: IconProps) => <IconUserCircle {...props} />,
  },
  {
    name: Routes.USERS,
    label: 'Usuários',
    renderIcon: (props: IconProps) => <IconUsers {...props} />,
  },
  {
    name: Routes.LOCATIONS,
    label: 'Inspeções',
    renderIcon: (props: IconProps) => <IconHammer {...props} />,
  },
  {
    name: Routes.CHECKLISTS,
    label: 'Checklists',
    renderIcon: (props: IconProps) => <IconChecklist {...props} />,
  },
]
