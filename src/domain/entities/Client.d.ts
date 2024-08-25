type TClientAttachments = {
  icon: TFile | null
  incon: TFile | null
}

type TClient = {
  idclient: number
  datecreate: string
  name: string
  cnpj: string
  razaosocial: string
  datelasfmodify: string
  status: string
  address: Array<TAddress>
  anexo: TClientAttachments
}
