type TChecklistQuestion = {
  idquestion: string
  name: string
  ativo: '1' | '0'
}

type TChecklistTopic = {
  subtitle: string
  questions: TChecklistQuestion[]
}

type TChecklist = {
  idchecklist: string
  name: string
  topics: TChecklistTopic[]
}
