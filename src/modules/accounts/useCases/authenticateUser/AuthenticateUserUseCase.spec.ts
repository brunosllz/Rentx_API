import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dto/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUsersUseCase } from "../createUser/CreateUserUseCase"
import { AutheticateUserUseCase } from "./AuthenticateUserUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AutheticateUserUseCase
let createUserUseCase: CreateUsersUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AutheticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
      driver_license: 'ddasdasd'
    }
    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an noexisting user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'falseUser@emial.com',
        password: '123456'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Doe',
        email: '123456',
        password: '123456',
        driver_license: 'ddasdasd'
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassword'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});