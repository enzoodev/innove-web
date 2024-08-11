/* eslint-disable no-useless-constructor */

export class UserRepository implements IUserRepository {
  constructor(private baseRepository: IBaseRepository) {}

  public async getAll(params: TGetUsersParams): Promise<Array<TUser>> {
    return this.baseRepository.getAll({
      url: 'users',
      params,
    })
  }

  public async getById(params: TGetUserParams): Promise<TUser> {
    return this.baseRepository.get({
      url: 'users',
      params,
    })
  }

  public async create(params: TCreateUserParams): Promise<void> {
    await this.baseRepository.create({
      url: 'adduser',
      data: params,
    })
  }

  public async update(params: TUpdateUserParams): Promise<void> {
    await this.baseRepository.create({
      url: 'adduser',
      data: params,
    })
  }

  public async delete(params: TDeleteUserParams): Promise<void> {
    await this.baseRepository.delete({
      url: 'deluser',
      params,
    })
  }
}