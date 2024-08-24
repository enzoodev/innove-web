import { HttpServices } from '@/services/HttpServices'

export const getAllLocations = async (params: TGetLocationsParams) => {
  return HttpServices.get<TLocations>({
    url: 'local',
    params,
  })
}
