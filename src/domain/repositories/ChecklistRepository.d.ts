interface IChecklistRepository {
  getAll(params: TGetChecklistsParams): Promise<Array<TChecklist>>
  getById(params: TGetChecklistParams): Promise<TChecklist>
  create(params: TCreateChecklistParams): Promise<void>
  update(params: TUpdateChecklistParams): Promise<void>
  inactiveQuestion(params: TInactiveChecklistQuestionParams): Promise<void>
}
