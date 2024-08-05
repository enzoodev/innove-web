import { BaseRepository } from './shared/BaseRepository'

export class UserRepository extends BaseRepository {
  public static async getUsers(params: TGetUsersParams): Promise<Array<TUser>> {
    return super.getAll({
      url: 'users',
      params,
    })
  }

  public static async createUser(params: TCreateUserParams): Promise<void> {
    await super.create({
      url: 'adduser',
      data: params,
    })
  }

  public static async updateUser(params: TUpdateUserParams): Promise<void> {
    await super.create({
      url: 'adduser',
      data: params,
    })
  }

  public static async deleteUser(params: TDeleteUserParams): Promise<void> {
    await super.delete({
      url: 'deluser',
      params,
    })
  }
}
