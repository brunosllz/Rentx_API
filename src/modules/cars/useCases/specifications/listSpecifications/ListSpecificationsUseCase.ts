import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { inject, injectable } from 'tsyringe';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute() {
    const Specifications = await this.specificationsRepository.list();

    return Specifications;
  }
}

export { ListSpecificationsUseCase };