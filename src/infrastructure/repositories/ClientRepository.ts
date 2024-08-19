/* eslint-disable no-useless-constructor */
import { getClientsMock } from '@/mocks/get-clients-mock'

export class ClientRepository implements IClientRepository {
  constructor(private readonly baseRepository: IBaseRepository) {}

  public async getAll(): Promise<Array<TClient>> {
    // return this.baseRepository.getAll({
    //   url: 'clients',
    // })
    return getClientsMock as any
  }

  public async getById(params: TGetClientParams): Promise<TClient> {
    const [client] = await this.baseRepository.get<Array<TClient>>({
      url: 'clients',
      params,
    })

    return client
  }

  public async create({ data, formData }: TCreateClientParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addclient',
      data,
      formData,
    })
  }

  public async update({ data, formData }: TUpdateClientParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addclient',
      data,
      formData,
    })
  }

  public async delete(params: TDeleteClientParams): Promise<void> {
    await this.baseRepository.delete({
      url: 'delclient',
      params,
    })
  }
}
