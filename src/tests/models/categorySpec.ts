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
  it('should be empty to start with', () => {
    expect(CategoryStore.index()).toBe([]);
  });
  it('should contain a create categories', () => {
    const category = CategoryStore.create({
      name: 'Fashion'
    });
    expect(CategoryStore.index()).toEqual([
      {
        id: category.id,
        name: 'Fashion'
      }
    ]);
  });
});

describe('Category store create method', () => {
  it('should create category given a valid name', () => {
    const category = CategoryStore.create({
      name: 'Electronics'
    });
    expect(category).toEqual([
      {
        id: category.id,
        name: 'Electronics'
      }
    ]);
  });
});
