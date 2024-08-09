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
    renderIcon: (props: IconProps) => <IconUserCircle {...props} />,
  },
  {
    name: Routes.USERS,
    renderIcon: (props: IconProps) => <IconUsers {...props} />,
  },
  {
    name: Routes.LOCATIONS,
    renderIcon: (props: IconProps) => <IconHammer {...props} />,
  },
  {
    name: Routes.CHECKLISTS,
    renderIcon: (props: IconProps) => <IconChecklist {...props} />,
  },
]
