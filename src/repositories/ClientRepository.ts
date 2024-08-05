import { BaseRepository } from './shared/BaseRepository'

export class ClientRepository extends BaseRepository {
  public static async getClients(
    params: TGetClientsParams,
  ): Promise<Array<TClient>> {
    return super.getAll({
      url: 'Clients',
      params,
    })
  }

  public static async createClient(params: TCreateClientParams): Promise<void> {
    await super.create({
      url: 'addClient',
      data: params,
    })
  }

  public static async updateClient(params: TUpdateClientParams): Promise<void> {
    await super.create({
      url: 'addClient',
      data: params,
    })
  }

  public static async deleteClient(params: TDeleteClientParams): Promise<void> {
    await super.delete({
      url: 'delClient',
      params,
    })
  }
}
