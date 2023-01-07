import { Category } from '../types/category';
import client from '../database';

export class CategoryStore {
  static async index(): Promise<Category[]> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT id, category_name AS name FROM categories'
    );
    conn.release();
    return result.rows;
  }

  //TODO: check if category already exists
  static async create(name: string): Promise<Category> {
    const conn = await client.connect();
    const createCategoryQuery =
      'INSERT INTO categories(category_name) VALUES($1) RETURNING id, category_name AS name';
    const result = await conn.query(createCategoryQuery, [name]);
    return result.rows[0];
  }
}
