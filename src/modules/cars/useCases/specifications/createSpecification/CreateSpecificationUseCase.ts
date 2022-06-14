import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private SpecificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists = await this.SpecificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    await this.SpecificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };