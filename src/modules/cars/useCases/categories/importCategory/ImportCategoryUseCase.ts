import { parse as CsvParse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';

import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { AppError } from '../../../../../shared/errors/AppError';
import { deleteFile } from '../../../../../utils/file';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = CsvParse();

      stream.pipe(parseFile);

      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({ name, description });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    if (!file) {
      throw new AppError('File not found');
    }

    if (!file.mimetype.includes('csv')) {
      deleteFile(file.path)
      throw new AppError('Invalid file type');
    }

    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };