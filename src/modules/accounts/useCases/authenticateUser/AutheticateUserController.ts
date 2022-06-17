import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutheticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUseCase = container.resolve(AutheticateUserUseCase);

    const token = await authenticateUseCase.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateUserController };