import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUsersUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, driver_license } = request.body;

    const createUsersUseCase = container.resolve(CreateUsersUseCase);

    await createUsersUseCase.execute({ name, email, password, driver_license });

    return response.status(201).send();
  }
}

export { CreateUserController };