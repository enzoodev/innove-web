import { HttpServices } from '@/services/HttpServices'
import { TokenRepository } from '@/repositories/TokenRepository'
import { getUserMock } from '@/mocks/get-user-mock'

export class AuthRepository {
  public static async getUser(): Promise<TAuth | null> {
    const hasToken = TokenRepository.has()

    if (!hasToken) {
      return null
    }

    // return HttpServices.get({
    //   url: 'user',
    // })

    return getUserMock
  }

  public static async login(params: TLoginParams): Promise<TAuth> {
    const response = await HttpServices.post<TAuth>({
      url: 'login',
      data: params,
    })

    TokenRepository.set(response.token)

    return response
  }

  public static async logout(): Promise<void> {
    await HttpServices.get({
      url: 'logout',
    })

    TokenRepository.delete()
  }

  public static async recoverAccount(
    params: TRecoverAccountParams,
  ): Promise<void> {
    await HttpServices.post({
      url: 'recover',
      data: params,
    })
  }

  public static async updatePassword(
    params: TUpdatePasswordParams,
  ): Promise<void> {
    await HttpServices.post({
      url: 'updatepass',
      data: params,
    })
  }
}
