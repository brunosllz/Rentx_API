import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/categories/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/categories/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = Multer({ dest: 'tmp/' });

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };