type TClientAttachments = {
  icon: TFile
  incon: TFile
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
