type TAuth = {
  iduser: number
  idclient: number
  login: string
  name: string
  email: string
  phone: string
  token: string
  lastlogin: string
  permissions: Array<TPermission>
  client_logo_icon: TFile
}
