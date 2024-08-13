type TChecklistQuestion = {
  idquestion: string
  name: string
  ativo: '1' | '0'
}

type TChecklist = {
  idchecklist: string
  subtitle: string
  questions: TChecklistQuestion[]
}
