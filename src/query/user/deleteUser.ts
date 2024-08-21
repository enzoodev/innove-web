import { HttpServices } from '@/services/HttpServices'

export const deleteUser = async (params: TDeleteUserParams) => {
  await HttpServices.delete({
    url: 'deluser',
    params,
  })
}
