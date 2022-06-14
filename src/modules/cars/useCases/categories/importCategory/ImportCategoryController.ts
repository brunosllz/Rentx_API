import { Request, Response } from "express";
import { container } from "tsyringe";
import fs from 'fs';

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { AppError } from "../../../../../errors/AppError";

class ImportCategoryController {


  async handle(request: Request, response: Response) {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    if (!file) {
      throw new AppError('File not found');
    }

    if (!file.mimetype.includes('csv')) {
      fs.promises.unlink(file.path);
      throw new AppError('Invalid file type');
    }

    await importCategoryUseCase.execute(file);

    return response.send(201);
  }
}

export { ImportCategoryController };