import { Category } from '../types/category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../errors';

export class CategoryStore {
  static async index(): Promise<Category[]> {
    return await CategoryRepository.findAll();
  }

  static async create(name: string): Promise<Category> {
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
