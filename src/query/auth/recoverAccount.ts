import { HttpServices } from '@/services/HttpServices'

export const recoverAccount = async (params: TRecoverAccountParams) => {
  await HttpServices.post({
    url: 'recover',
    data: params,
    type: 'auth',
  })
}
