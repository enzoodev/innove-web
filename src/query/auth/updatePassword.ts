import { HttpServices } from '@/services/HttpServices'

export const updatePassword = async (params: TUpdatePasswordParams) => {
  await HttpServices.post({
    url: 'updatepass',
    data: params,
    type: 'auth',
  })
}
