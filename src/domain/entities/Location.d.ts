type TLocationTypeKey = 'Obra' | 'Area' | 'Equipamento'

type TLocationType = {
  id: number
  name: TLocationTypeKey
}

type TLocationStatus = '1' | '0'

type TLocationConstruction = {
  id: number
  tipo: TLocationType
  nome: string
  cnpj: string
  razaosocial: string
  datecreate: string
  datestart: string
  idclient: number
  status: TLocationStatus
  address: Array<TAddress>
  responsavel: string
  emailresponsavel: string
}

type TLocationEquipment = {
  id: number
  tipo: TLocationType
  nome: string
  tag: string
  placa: string
  modelo: string
  datecreate: string
  idclient: number
  status: TLocationStatus
  responsavel: string
  emailresponsavel: string
}

type TLocationArea = {
  id: number
  tipo: TLocationType
  nome: string
  datecreate: string
  idclient: number
  status: TLocationStatus
  responsavel: string
  emailresponsavel: string
}

type TLocations = {
  Obra: Array<TLocationConstruction>
  Area: Array<TLocationArea>
  Equipamento: Array<TLocationEquipment>
}

type TLocation = TLocationArea | TLocationConstruction | TLocationEquipment
