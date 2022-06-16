import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUsersUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, driver_license, avatar } = request.body;

    const createUsersUseCase = container.resolve(CreateUsersUseCase);

    await createUsersUseCase.execute({ name, email, password, driver_license, avatar });

    return response.status(201).send();
  }
}

export { CreateUserController };