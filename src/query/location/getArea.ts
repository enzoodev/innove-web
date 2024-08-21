import { HttpServices } from '@/services/HttpServices'

export const getArea = async (params: TGetLocationParams) => {
  const [area] = await HttpServices.get<Array<TLocationArea>>({
    url: 'local',
    params,
  })

  return area
}
