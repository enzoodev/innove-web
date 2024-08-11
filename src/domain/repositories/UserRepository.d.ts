interface IUserRepository {
  getAll(params: TGetUsersParams): Promise<Array<TUser>>
  getById(params: TGetUserParams): Promise<TUser>
  create(params: TCreateUserParams): Promise<void>
  update(params: TUpdateUserParams): Promise<void>
  delete(params: TDeleteUserParams): Promise<void>
}
