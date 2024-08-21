import { HttpServices } from '@/services/HttpServices'

export const getUserById = async (params: TGetUserParams) => {
  return HttpServices.get<TUser>({
    url: 'users',
    params,
  })
}
