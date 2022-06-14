import { SpecificationsRepository } from "../../../repositories/implementations/SpecificationsRepository";
import { ListEspecificationsController } from "./ListEspecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationsRepository = null

const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepository);

const listEspecificationsController = new ListEspecificationsController(listSpecificationsUseCase);

export { listEspecificationsController };