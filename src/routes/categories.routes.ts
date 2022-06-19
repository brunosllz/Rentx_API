import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/categories/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/categories/listCategories/ListCategoriesController';
import uploadConfig from '../config/upload';

const categoriesRoutes = Router();
const uploadFile = Multer(uploadConfig.upload('./tmp'));

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post('/import', uploadFile.single('file'), importCategoryController.handle);

export { categoriesRoutes };