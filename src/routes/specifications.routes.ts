import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/specifications/createSpecification';
import { listEspecificationsController } from '../modules/cars/useCases/specifications/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
  return listEspecificationsController.handle(request, response);
});

export { specificationsRoutes };