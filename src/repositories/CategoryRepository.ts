import { Category } from '../types/category';
import client from '../database';
import { QueryResult } from 'pg';

export class CategoryRepository {
  static async findAll(): Promise<Category[]> {
    const conn = await client.connect();
    const result: QueryResult<Category> = await conn.query(
      'SELECT id, category_name AS name FROM categories'
    );
    conn.release();
    return result.rows;
  }

  static async save(name: string): Promise<Category> {
    const conn = await client.connect();
    const createCategoryQuery =
      'INSERT INTO categories(category_name) VALUES($1) ' +
      'RETURNING id, category_name AS name';
    const result: QueryResult<Category> = await conn.query(
      createCategoryQuery,
      [name]
    );
    return result.rows[0];
  }
}
