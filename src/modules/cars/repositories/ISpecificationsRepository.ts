import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specifications>;
  list(): Promise<Specifications[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };