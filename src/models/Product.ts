import { StatusCodes } from 'http-status-codes';

import { BadRequestError, CustomError } from '../errors';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { Product, ProductDetails } from '../types/product';
import { productSchema, uuidSchema } from '../utils/validations';

export class ProductStore {
  static async index(): Promise<Product[]> {
    return await ProductRepository.findAll();
  }

  static async show(id: string): Promise<Product> {
    await uuidSchema.validateAsync({ id });
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new BadRequestError('There is no product with id: ' + id);
    }

    return product;
  }

  //TODO: add trailing zeros
  static async create(details: ProductDetails): Promise<Product> {
    await productSchema.validateAsync(details, { abortEarly: false });

    if (
      await ProductRepository.isExistentProduct(details.name, details.category)
    ) {
      throw new CustomError(
        `Product '${details.name}' of category '${details.category}' already exists`,
        StatusCodes.CONFLICT
      );
    }

    const createdProduct = await ProductRepository.save(details);

    if (!createdProduct) {
      throw new CustomError(
        'Failed to create product',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return createdProduct;
  }

  //TODO: Move topNProducts to dashboard
  //@ts-ignore
  static async topNProducts(): Promise<Product[]> {}

  static async productsByCategory(category: string): Promise<Product[]> {
    const selectedCategory = await CategoryRepository.findByName(category);

    if (!selectedCategory) {
      throw new BadRequestError(`Category '${category}' does not exist`);
    }
    return await ProductRepository.findByCategory(category);
  }
}
