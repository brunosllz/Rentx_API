import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory';
import { listCategoryController } from '../modules/cars/useCases/categories/listCategories';

const categoriesRoutes = Router();
const upload = Multer({ dest: 'tmp/' });

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
})



export { categoriesRoutes };