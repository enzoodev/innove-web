import { BaseRepository } from './shared/BaseRepository'

export class ClientRepository extends BaseRepository {
  public static async getClients(): Promise<Array<TClient>> {
    return super.getAll({
      url: 'clients',
    })
  }

  public static async getClient(params: TGetClientParams): Promise<TClient> {
    const [client] = await super.get<Array<TClient>>({
      url: 'clients',
      params,
    })

    return client
  }

  public static async createClient(params: TCreateClientParams): Promise<void> {
    await super.create({
      url: 'addclient',
      data: params,
    })
  }

  public static async updateClient(params: TUpdateClientParams): Promise<void> {
    await super.create({
      url: 'addclient',
      data: params,
    })
  }

  public static async deleteClient(params: TDeleteClientParams): Promise<void> {
    await super.delete({
      url: 'delclient',
      params,
    })
  }
}
