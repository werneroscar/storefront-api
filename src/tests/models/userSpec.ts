import { UserStore } from '../../models/User';
import { BadRequestError } from '../../errors';

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

describe('User store', () => {
  it('should create a user', async () => {
    const createdUser = await UserStore.create({
      firstName: 'Danny',
      lastName: 'Bontii',
      password: '1234',
    });

    expect(createdUser).toEqual({
      id: createdUser.id,
      firstName: 'Danny',
      lastName: 'Bontii',
    });
  });

  it('should not return user password after creation', async () => {
    const createdUser = await UserStore.create({
      firstName: 'Jax',
      lastName: 'Brigss',
      password: '1234',
    });

    //@ts-ignore
    expect(createdUser.password).toBeUndefined;
  });

  it('should should throw error if first name is not provided', async () => {
    const user = {
      firstName: '',
      lastName: 'Brigss',
      password: '1234',
    };

    expect(()=>UserStore.create(user)).toThrowError(BadRequestError,'please provide first name');
  });

  it('should should throw error if last name is not provided', async () => {
    const user = {
      firstName: 'Dan',
      lastName: '',
      password: '1234',
    };

    expect(()=>UserStore.create(user)).toThrowError(BadRequestError, 'please provide last name');
  });

  it('should should throw error if password is not provided', async () => {
    const user = {
      firstName: 'Dan',
      lastName: '',
      password: '1234',
    };

    expect(()=>UserStore.create(user)).toThrowError(BadRequestError, 'please provide a password');
  });
  
});
