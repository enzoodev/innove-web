/* eslint-disable no-useless-constructor */
import { getUserMock } from '@/mocks/get-user-mock'

export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly httpServices: IHttpServices,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public async getUser(): Promise<TAuth | null> {
    return getUserMock

    // if (!this.tokenRepository.has()) {
    //   return null
    // }

    // return await this.httpServices.get<TAuth>({
    //   url: 'user',
    // });
  }

  public async login(params: TLoginParams): Promise<TAuth> {
    const response = await this.httpServices.post<TAuth>({
      url: 'login',
      data: params,
    })

    this.tokenRepository.set(response.token)

    return response
  }

  public async logout(): Promise<void> {
    await this.httpServices.get({
      url: 'logout',
    })

    this.tokenRepository.delete()
  }

  public async recoverAccount(params: TRecoverAccountParams): Promise<void> {
    await this.httpServices.post({
      url: 'recover',
      data: params,
    })
  }

  public async updatePassword(params: TUpdatePasswordParams): Promise<void> {
    await this.httpServices.post({
      url: 'updatepass',
      data: params,
    })
  }
}
