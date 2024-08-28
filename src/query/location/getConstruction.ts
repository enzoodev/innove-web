import { HttpServices } from '@/services/HttpServices'

export const getConstruction = async (params: TGetLocationParams) => {
  const construction = await HttpServices.get<TLocationConstruction>({
    url: 'local',
    params,
  })

  return construction
}
