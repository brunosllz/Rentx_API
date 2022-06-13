import { SpecificationsRepository } from "../../../repositories/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationUseCase: CreateSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

const createSpecificationController: CreateSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };