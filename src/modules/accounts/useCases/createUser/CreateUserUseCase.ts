import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, username, email, password, driver_license }: ICreateUserDTO) {



    await this.usersRepository.create({ name, username, email, password, driver_license });
  }
}

export { CreateUsersUseCase };