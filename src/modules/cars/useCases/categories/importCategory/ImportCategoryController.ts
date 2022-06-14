import { Request, Response } from "express";
import { container } from "tsyringe";
import fs from 'fs';

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {


  async handle(request: Request, response: Response) {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    if (!file) {
      throw new Error('File not found');
    }

    if (!file.mimetype.includes('csv')) {
      fs.promises.unlink(file.path);
      throw new Error('Invalid file type');
    }

    await importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };