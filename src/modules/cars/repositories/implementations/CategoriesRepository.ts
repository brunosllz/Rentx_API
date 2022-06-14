import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repositoy: Repository<Category>

  constructor() {
    this.repositoy = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = this.repositoy.create({
      name,
      description
    });

    this.repositoy.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repositoy.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repositoy.findOne({ name });

    return category;
  }
}

export { CategoriesRepository }