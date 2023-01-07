import { CategoryStore } from '../../models/Category';

describe('Category store', () => {
  it('should contain an index method', () => {
    expect(CategoryStore.index).toBeDefined();
  });
  it('should contain a create method', () => {
    expect(CategoryStore.create).toBeDefined();
  });
});

describe('Category store index method', () => {
  it('should be empty to start with', async () => {
    expect(await CategoryStore.index()).toEqual([]);
  });
  it('should contain a all categories', async () => {
    const category = await CategoryStore.create('Fashion');
    expect(await CategoryStore.index()).toEqual([
      {
        id: category.id,
        name: 'Fashion'
      }
    ]);
  });
});

describe('Category store create method', () => {
  it('should create category given a valid name', async () => {
    const category = await CategoryStore.create('Electronics');
    expect(category).toEqual({
      id: category.id,
      name: 'Electronics'
    });
  });
});
