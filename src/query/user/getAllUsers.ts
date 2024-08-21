import { HttpServices } from '@/services/HttpServices'

export const getAllUsers = async (params: TGetUsersParams) => {
  return HttpServices.get<Array<TUser>>({
    url: 'users',
    params,
  })
}
