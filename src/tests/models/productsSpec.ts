import { CategoryStore } from '../../models/Category';
import { ProductStore } from '../../models/Product';
import { Category } from '../../types/category';

describe('Product Store should have', () => {
  it('an index method', () => {
    expect(ProductStore.index()).toBeDefined();
  });

  it('a show method', () => {
    expect(ProductStore.show()).toBeDefined();
  });

  it('a create method', () => {
    expect(ProductStore.create()).toBeDefined();
  });

  it('a topNProducts method', () => {
    expect(ProductStore.topNProducts()).toBeDefined();
  });

  it('a productsByCategory method', () => {
    expect(ProductStore.productsByCategory()).toBeDefined();
  });
});

describe('Product Store ', () => {
  let testProduct: Product;
  let testCategory: Category;

  it('should create product', async () => {
    const category = await CategoryStore.create('Ladies Wear');
    testCategory = category;
    const product = await ProductStore.create({
      name: 'Test Product',
      price: 2.99,
      categoryId: category.id
    });
    testProduct = product;
    expect(product).toEqual({
      id: product.id,
      name: 'Test Product',
      price: 2.99
    });
  });

  it('should show requested product', async () => {
    expect(await ProductStore.show(testProduct)).toEqual({
      id: testProduct.id,
      name: testProduct.name,
      price: testProduct.price
    });
  });

  it('should show prodcuts by category', async () => {
    const productTwo = await ProductStore.create({
      name: 'Test Product 2',
      price: 4.99,
      categoryId: testCategory.id
    });
    const productThree = await ProductStore.create({
      name: 'Test Product ',
      price: 46.43,
      categoryId: testCategory.id
    });

    const category = await CategoryStore.create("Men's underwear");

    await ProductStore.create({
      name: 'Test Product ',
      price: 46.43,
      categoryId: category.id
    });
    expect(ProductStore.productsByCategory(testCategory.name)).toEqual([
      {
        id: testProduct.id,
        name: testProduct.name,
        price: testProduct.price
      },
      {
        id: productTwo.id,
        name: productTwo.name,
        price: productTwo.price
      },
      {
        id: productThree.id,
        name: productThree.name,
        price: productThree.price
      }
    ]);
  });
});
