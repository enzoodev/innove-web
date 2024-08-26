type TUser = {
  iduser: number
  datecreate: string
  createdby: string
  name: string
  email: string
  phone: string
  login: string
  datelastlogin: string
  statususer: '1' | '0'
  status: '1' | '0'
  permissions: Array<TPermission>
}
