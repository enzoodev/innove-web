import { HttpServices } from '@/services/HttpServices'

export const updateEquipment = async (params: TUpdateEquipmentParams) => {
  await HttpServices.post({
    url: 'addequipament',
    data: params,
  })
}
