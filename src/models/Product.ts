import { QueryResult } from 'pg';
import client from '../database';
import { Category } from '../types/category';
import { Product, ProductDetails } from '../types/product';
import { productSchema, uuidSchema } from '../utils/validations';
import { CategoryStore } from './Category';

//TODO: id validations
export class ProductStore {
  static async index(): Promise<Product[]> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT products.*, categories.id AS categoryId, categories.category_name as category FROM products ' +
        'JOIN categories ON products.category_id = categories.id'
    );
    conn.release();
    return result.rows.map((row) => {
      return {
        id: row.id,
        category: row.category,
        categoryId: row.categoryid,
        price: row.price,
        name: row.product_name
      };
    });
  }

  static async show(id: string): Promise<Product> {
    const conn = await client.connect();
    await uuidSchema.validateAsync({ id });
    const productQuery =
      'SELECT products.*, categories.id AS categoryId, categories.category_name as category FROM products ' +
      'JOIN categories ON products.category_id = categories.id WHERE products.id = ($1)';
    const result = await conn.query(productQuery, [id]);
    conn.release();
    return {
      id: result.rows[0].id,
      category: result.rows[0].category,
      categoryId: result.rows[0].category_id,
      price: result.rows[0].price,
      name: result.rows[0].product_name
    };
  }

  //TODO: check if product already exists
  static async create(details: ProductDetails): Promise<Product> {
    const conn = await client.connect();
    await productSchema.validateAsync(details, { abortEarly: false });
    const createProductQuery =
      'INSERT INTO products (product_name, price, category_id) ' +
      'VALUES ($1, $2, $3) RETURNING *';

    const categoryIdQuery =
      'SELECT id from categories WHERE LOWER(category_name) = ($1)';
    const categoryIdResult = await conn.query(categoryIdQuery, [
      details.category.toLowerCase()
    ]);

    let result: QueryResult<any>;
    let newCategory: Category;

    if (categoryIdResult.rowCount) {
      result = await conn.query(createProductQuery, [
        details.name,
        details.price,
        categoryIdResult.rows[0].id
      ]);
    } else {
      newCategory = await CategoryStore.create(details.category);
      result = await conn.query(createProductQuery, [
        details.name,
        details.price,
        newCategory.id
      ]);
    }
    // console.log(result);
    conn.release();

    return {
      id: result.rows[0].id,
      name: result.rows[0].product_name,
      price: result.rows[0].price,
      categoryId: result.rows[0].category_id,
      category: details.category
    };
  }

  //TODO: Move topNProducts to dashboard
  //@ts-ignore
  static async topNProducts(): Promise<Product[]> {}
  //@ts-ignore
  static async productsByCategory(category: string): Promise<Product[]> {
    const conn = await client.connect();
    const productIdQuery =
      'SELECT id from categories WHERE LOWER(category_name) = ($1)';
    const productIdResult = await conn.query(productIdQuery, [
      category.toLowerCase()
    ]);
    const categoryId = productIdResult.rows[0].id;

    const categoryQuery =
      'SELECT products.*, categories.id AS categoryId, categories.category_name as category FROM products ' +
      'JOIN categories ON products.category_id = categories.id WHERE categories.id = ($1)';

    const categoryResult = await conn.query(categoryQuery, [categoryId]);

    return categoryResult.rows.map((row) => {
      return {
        id: row.id,
        category: row.category,
        categoryId: row.categoryid,
        price: row.price,
        name: row.product_name
      };
    });
  }
}
