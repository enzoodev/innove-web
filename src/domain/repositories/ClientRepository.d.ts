interface IClientRepository {
  getAll(): Promise<Array<TClient>>
  getById(params: TGetClientParams): Promise<TClient>
  create(params: TCreateClientParams): Promise<void>
  update(params: TUpdateClientParams): Promise<void>
  delete(params: TDeleteClientParams): Promise<void>
}
