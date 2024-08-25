type TCreateClientParams = {
  name: string
  cpnj: string
  razaosocial: string
  rua: string
  numero: string
  complemento?: string
  cep: string
  bairro: string
  cidade: string
  estado: string
  ativo: string
  files: {
    file_icon: string | undefined
    file_logo: string | undefined
  }
}
