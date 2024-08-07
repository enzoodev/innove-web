type TChecklistQuestion = {
  idquestion: string
  name: string
  ativo: '1' | '0'
}

type TChecklist = {
  subtitle: string
  questions: TChecklistQuestion[]
}
