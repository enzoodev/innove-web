import { HttpServices } from '@/services/HttpServices'

export const createEquipment = async (params: TCreateEquipmentParams) => {
  await HttpServices.post({
    url: 'addequipament',
    data: params,
  })
}
