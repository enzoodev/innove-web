import { HttpServices } from '@/services/HttpServices'

export const getArea = async (params: TGetLocationParams) => {
  const area = await HttpServices.get<TLocationArea>({
    url: 'local',
    params,
  })

  return area
}
