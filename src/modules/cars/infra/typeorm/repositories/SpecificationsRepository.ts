import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specifications } from "../entities/Specifications";


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = await this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specifications[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };