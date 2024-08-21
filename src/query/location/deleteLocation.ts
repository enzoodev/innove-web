import { HttpServices } from '@/services/HttpServices'

export const deleteLocation = async (params: TDeleteLocationParams) => {
  await HttpServices.delete({
    url: 'dellocal',
    params,
  })
}
