import { ISpecificationsRepository } from "../../../repositories/implementations/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute() {
    const Specifications = this.specificationsRepository.list();

    return Specifications;
  }
}

export { ListSpecificationsUseCase };