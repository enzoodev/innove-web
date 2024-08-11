interface ILocationRepository {
  getAll(params: TGetLocationsParams): Promise<TLocations>
  getArea(params: TGetLocationParams): Promise<TLocationArea>
  getConstruction(params: TGetLocationParams): Promise<TLocationConstruction>
  getEquipment(params: TGetLocationParams): Promise<TLocationEquipment>
  createConstruction(params: TCreateConstructionParams): Promise<void>
  updateConstruction(params: TUpdateConstructionParams): Promise<void>
  createArea(params: TCreateAreaParams): Promise<void>
  updateArea(params: TUpdateAreaParams): Promise<void>
  createEquipment(params: TCreateEquipmentParams): Promise<void>
  updateEquipment(params: TUpdateEquipmentParams): Promise<void>
  delete(params: TDeleteLocationParams): Promise<void>
}
