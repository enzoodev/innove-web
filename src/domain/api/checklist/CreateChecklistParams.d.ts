type Question = {
  idquestion?: string
  subtitle: string
  name: string
  ativo: '1' | '0'
}

type TCreateChecklistParams = {
  idclient: string
  name: string
  tipochecklist: string
  ativo: string
  questions: Question[]
}
