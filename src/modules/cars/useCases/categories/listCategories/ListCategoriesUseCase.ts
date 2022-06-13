import { ICategoriesRepository } from "../../../repositories/implementations/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute() {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase }