type TAuthPermission = {
  id: string
  idpermission: string
  name: string
}

type TAuth = {
  iduser: number
  idclient: number
  login: string
  name: string
  email: string
  phone: string
  token: string
  lastlogin: string
  permissions: Array<TAuthPermission>
  client_logo_icon: TFile
}
