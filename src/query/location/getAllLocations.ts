import { getLocations } from '@/mocks/get-locations'
import { HttpServices } from '@/services/HttpServices'

export const getAllLocations = async (params: TGetLocationsParams) => {
  // return HttpServices.get<TLocations>({
  //   url: 'local',
  //   params,
  // })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getLocations as TLocations
}
