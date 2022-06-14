import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory';
import { ListCategoriesController } from '../modules/cars/useCases/categories/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = Multer({ dest: 'tmp/' });

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
})



export { categoriesRoutes };