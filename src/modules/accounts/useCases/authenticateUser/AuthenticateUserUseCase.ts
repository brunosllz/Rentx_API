import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  },
  token: string;
}

@injectable()
class AutheticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password invalid", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email or password invalid", 401);
    }

    const token = sign({}, '9f18bc74eb221967f53340d607912b5f', {
      subject: user.id,
      expiresIn: '1d'
    });

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return tokenResponse;
  }
}

export { AutheticateUserUseCase };