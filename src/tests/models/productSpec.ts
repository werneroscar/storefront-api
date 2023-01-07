import { CategoryStore } from '../../models/Category';
import { ProductStore } from '../../models/Product';
import { Category } from '../../types/category';
import { Product } from '../../types/product';

describe('Product Store should have', () => {
  it('an index method', () => {
    expect(ProductStore.index).toBeDefined();
  });

  it('a show method', () => {
    expect(ProductStore.show).toBeDefined();
  });

  it('a create method', () => {
    expect(ProductStore.create).toBeDefined();
  });

  it('a topNProducts method', () => {
    expect(ProductStore.topNProducts()).toBeDefined();
  });

  it('a productsByCategory method', () => {
    expect(ProductStore.productsByCategory).toBeDefined();
  });
});

describe('Product Store ', () => {
  let testProduct: Product;
  let testProductTwo: Product;
  let testProductThree: Product;
  let testProductFour: Product;

  let testCategory: Category;

  it('should create product', async () => {
    const category = await CategoryStore.create('Ladies Wear');
    testCategory = category;
    const product = await ProductStore.create({
      name: 'Test Product',
      price: 2.99,
      categoryId: +category.id
    });
    testProduct = product;
    expect(product).toEqual({
      id: product.id,
      name: 'Test Product',
      price: 2.99,
      categoryId: +category.id,
      category: category.name
    });
  });

  it('should show requested product', async () => {
    expect(await ProductStore.show(testProduct.id)).toEqual({
      id: testProduct.id,
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category,
      categoryId: testProduct.categoryId
    });
  });

  it('should show prodcuts by category', async () => {
    const productTwo = await ProductStore.create({
      name: 'Test Product two',
      price: 4.99,
      categoryId: +testCategory.id
    });
    testProductTwo = productTwo;
    const productThree = await ProductStore.create({
      name: 'Test Product',
      price: 46.43,
      categoryId: +testCategory.id
    });
    testProductThree = productThree;

    const category = await CategoryStore.create("Men's underwear");

    const productFour = await ProductStore.create({
      name: 'Test Product',
      price: 46.43,
      categoryId: +category.id
    });
    testProductFour = productFour;
    expect(await ProductStore.productsByCategory(testCategory.name)).toEqual([
      {
        id: testProduct.id,
        name: testProduct.name,
        price: testProduct.price,
        category: testProduct.category,
        categoryId: testProduct.categoryId
      },
      {
        id: productTwo.id,
        name: productTwo.name,
        price: productTwo.price,
        category: productTwo.category,
        categoryId: productTwo.categoryId
      },
      {
        id: productThree.id,
        name: productThree.name,
        price: productThree.price,
        category: productThree.category,
        categoryId: productThree.categoryId
      }
    ]);
  });

  it('should show all products', async () => {
    expect(await ProductStore.index()).toEqual([
      {
        id: testProduct.id,
        name: testProduct.name,
        price: testProduct.price,
        category: testProduct.category,
        categoryId: testProduct.categoryId
      },
      {
        id: testProductTwo.id,
        name: testProductTwo.name,
        price: testProductTwo.price,
        category: testProductTwo.category,
        categoryId: testProductTwo.categoryId
      },
      {
        id: testProductThree.id,
        name: testProductThree.name,
        price: testProductThree.price,
        category: testProductThree.category,
        categoryId: testProductThree.categoryId
      },
      {
        id: testProductFour.id,
        name: testProductFour.name,
        price: testProductFour.price,
        category: testProductFour.category,
        categoryId: testProductFour.categoryId
      }
    ]);
  });
});
