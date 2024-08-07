import { BaseRepository } from './shared/BaseRepository'

export class LocationRepository extends BaseRepository {
  public static async getLocations(
    params: TGetLocationsParams,
  ): Promise<TLocations> {
    return super.get({
      url: 'local',
      params,
    })
  }

  public static async getArea(
    params: TGetLocationParams,
  ): Promise<TLocationArea> {
    const [area] = await super.get<Array<TLocationArea>>({
      url: 'local',
      params,
    })

    return area
  }

  public static async getConstruction(
    params: TGetLocationParams,
  ): Promise<TLocationArea> {
    const [construction] = await super.get<Array<TLocationConstruction>>({
      url: 'local',
      params,
    })

    return construction
  }

  public static async getEquipment(
    params: TGetLocationParams,
  ): Promise<TLocationArea> {
    const [equipment] = await super.get<Array<TLocationEquipment>>({
      url: 'local',
      params,
    })

    return equipment
  }

  public static async createConstruction(
    params: TCreateConstructionParams,
  ): Promise<void> {
    await super.create({
      url: 'addobra',
      data: params,
    })
  }

  public static async updateConstruction(
    params: TUpdateConstructionParams,
  ): Promise<void> {
    await super.create({
      url: 'addobra',
      data: params,
    })
  }

  public static async createArea(params: TCreateAreaParams): Promise<void> {
    await super.create({
      url: 'addarea',
      data: params,
    })
  }

  public static async updateArea(params: TUpdateAreaParams): Promise<void> {
    await super.create({
      url: 'addarea',
      data: params,
    })
  }

  public static async createEquipment(
    params: TCreateEquipmentParams,
  ): Promise<void> {
    await super.create({
      url: 'addequipament',
      data: params,
    })
  }

  public static async updateEquipment(
    params: TUpdateEquipmentParams,
  ): Promise<void> {
    await super.create({
      url: 'addequipament',
      data: params,
    })
  }

  public static async deleteLocation(
    params: TDeleteLocationParams,
  ): Promise<void> {
    await super.delete({
      url: 'dellocal',
      params,
    })
  }
}
