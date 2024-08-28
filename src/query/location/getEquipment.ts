import { HttpServices } from '@/services/HttpServices'

export const getEquipment = async (params: TGetLocationParams) => {
  const equipment = await HttpServices.get<TLocationEquipment>({
    url: 'local',
    params,
  })

  return equipment
}
