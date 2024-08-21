import { HttpServices } from '@/services/HttpServices'

export const updateUser = async (data: TUpdateUserParams) => {
  await HttpServices.post({
    url: 'adduser',
    data,
  })
}
