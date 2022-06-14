import { Router } from 'express';
import Multer from 'multer';

import createCategoryController from '../modules/cars/useCases/categories/createCategory';
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory';
import { listCategoryController } from '../modules/cars/useCases/categories/listCategories';

const categoriesRoutes = Router();
const upload = Multer({ dest: 'tmp/' });

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
})



export { categoriesRoutes };