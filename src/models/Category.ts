import { Category } from '../types/category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../errors';
import { categorySchema } from '../utils/validations';

export class CategoryStore {
  static async index(): Promise<Category[]> {
    return await CategoryRepository.findAll();
  }

  static async create(name: string): Promise<Category> {
    await categorySchema.validateAsync({ name });
    const categoryExits = await CategoryRepository.findByName(name);
    if (categoryExits) {
      throw new CustomError(
        `Category '${name}' already exists`,
        StatusCodes.CONFLICT
      );
    }
    return await CategoryRepository.save(name);
  }
}
