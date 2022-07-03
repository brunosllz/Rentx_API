import { ICreateCarDTO } from "../../dto/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "../../infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    brand,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    name }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      brand,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }
}

export { CarsRepositoryInMemory }