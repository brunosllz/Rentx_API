import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password, driver_license, avatar }: ICreateUserDTO) {



    await this.usersRepository.create({ name, email, password, driver_license, avatar });
  }
}

export { CreateUsersUseCase };