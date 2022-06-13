import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUsecase: CreateCategoryUseCase) { }

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    this.createCategoryUsecase.execute({ name, description });

    response.status(201).send();
  }
}

export { CreateCategoryController }