import { UserStore } from '../../models/User';

describe('User store', () => {
  it('should have an index method', () => {
    expect(UserStore.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(UserStore.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(UserStore.create).toBeDefined();
  });
});
