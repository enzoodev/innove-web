import { getUsersMock } from '@/mocks/get-users-mock'
import { HttpServices } from '@/services/HttpServices'

export const getAllUsers = async (params: TGetUsersParams) => {
  // return HttpServices.get<Array<TUser>>({
  //   url: 'users',
  //   params,
  // })
  return getUsersMock as Array<TUser>
}
