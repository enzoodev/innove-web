import { HttpServices } from '@/services/HttpServices'

export const createUser = async (data: TCreateUserParams) => {
  await HttpServices.post({
    url: 'adduser',
    data,
  })
}
