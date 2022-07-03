import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "New car",
      brand: "Brand car",
      category_id: "Category",
      daily_rate: 100,
      license_plate: "ADB-3123",
      fine_amount: 60,
      description: "Description car"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should be not able to create a car with same license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "New car1",
        brand: "Brand car",
        category_id: "Category",
        daily_rate: 100,
        license_plate: "ADB-3123",
        fine_amount: 60,
        description: "Description car"
      });

      await createCarUseCase.execute({
        name: "Name car 2",
        brand: "Brand car",
        category_id: "Category",
        daily_rate: 100,
        license_plate: "ADB-3123",
        fine_amount: 60,
        description: "Description car"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "New car1",
      brand: "Brand car",
      category_id: "Category",
      daily_rate: 100,
      license_plate: "ADBCD-3123",
      fine_amount: 60,
      description: "Description car"
    });

    expect(car.available).toBe(true);
  });
})