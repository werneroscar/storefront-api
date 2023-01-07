import { Category } from '../types/category';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryStore {
  static async index(): Promise<Category[]> {
    return await CategoryRepository.findAll();
  }

  //TODO: check if category already exists
  static async create(name: string): Promise<Category> {
    return await CategoryRepository.save(name);
  }
}
