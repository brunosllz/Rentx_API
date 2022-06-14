import { SpecificationsRepository } from "../../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = null;

const createSpecificationUseCase: CreateSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

const createSpecificationController: CreateSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };