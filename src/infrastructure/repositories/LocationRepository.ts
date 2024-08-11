/* eslint-disable no-useless-constructor */

export class LocationRepository implements ILocationRepository {
  constructor(private readonly baseRepository: IBaseRepository) {}

  public async getAll(params: TGetLocationsParams): Promise<TLocations> {
    return this.baseRepository.get({
      url: 'local',
      params,
    })
  }

  public async getArea(params: TGetLocationParams): Promise<TLocationArea> {
    const [area] = await this.baseRepository.get<Array<TLocationArea>>({
      url: 'local',
      params,
    })

    return area
  }

  public async getConstruction(
    params: TGetLocationParams,
  ): Promise<TLocationConstruction> {
    const [construction] = await this.baseRepository.get<
      Array<TLocationConstruction>
    >({
      url: 'local',
      params,
    })

    return construction
  }

  public async getEquipment(
    params: TGetLocationParams,
  ): Promise<TLocationEquipment> {
    const [equipment] = await this.baseRepository.get<
      Array<TLocationEquipment>
    >({
      url: 'local',
      params,
    })

    return equipment
  }

  public async createConstruction(
    params: TCreateConstructionParams,
  ): Promise<void> {
    await this.baseRepository.create({
      url: 'addobra',
      data: params,
    })
  }

  public async updateConstruction(
    params: TUpdateConstructionParams,
  ): Promise<void> {
    await this.baseRepository.create({
      url: 'addobra',
      data: params,
    })
  }

  public async createArea(params: TCreateAreaParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addarea',
      data: params,
    })
  }

  public async updateArea(params: TUpdateAreaParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addarea',
      data: params,
    })
  }

  public async createEquipment(params: TCreateEquipmentParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addequipament',
      data: params,
    })
  }

  public async updateEquipment(params: TUpdateEquipmentParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addequipament',
      data: params,
    })
  }

  public async delete(params: TDeleteLocationParams): Promise<void> {
    await this.baseRepository.delete({
      url: 'dellocal',
      params,
    })
  }
}
