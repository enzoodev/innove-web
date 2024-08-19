/* eslint-disable no-useless-constructor */

import { getChecklistsMock } from '@/mocks/get-checklists-mock'

export class ChecklistRepository implements IChecklistRepository {
  constructor(private readonly baseRepository: IBaseRepository) {}

  public async getAll(): Promise<Array<TChecklist>> {
    // return this.baseRepository.getAll({
    //   url: 'checklist',
    // })
    return getChecklistsMock as any
  }

  public async getById(params: TGetChecklistParams): Promise<TChecklist> {
    return this.baseRepository.get<TChecklist>({
      url: 'checklist',
      params,
    })
  }

  public async create(params: TCreateChecklistParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addchecklist',
      data: params,
    })
  }

  public async update(params: TUpdateChecklistParams): Promise<void> {
    await this.baseRepository.create({
      url: 'addchecklist',
      data: params,
    })
  }

  public async inactiveQuestion(
    params: TInactiveChecklistQuestionParams,
  ): Promise<void> {
    await this.baseRepository.delete({
      url: 'delquestion',
      params,
    })
  }
}
