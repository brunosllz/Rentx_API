import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import fs from 'fs';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  handle(request: Request, response: Response) {
    const { file } = request;

    if (!file) {
      throw new Error('File not found');
    }

    if (!file.mimetype.includes('csv')) {
      fs.promises.unlink(file.path);
      throw new Error('Invalid file type');
    }

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };