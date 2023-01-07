import { UserStore } from '../../models/User';
import { BadRequestError } from '../../errors';
import { getInvalidDetailsError } from '../../utils/get-errors';

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
    //@ts-ignore
    const user = {
      firstName: undefined,
      lastName: 'Mitchel',
      password: 'Mitch123',
    };

    //@ts-ignore
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toEqual(new BadRequestError('Please provide first name'));
  });

  it('should should throw error if first name less than one character', async () => {
    const user = {
      firstName: '',
      lastName: 'Logan',
      password: '6587',
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toEqual(
      new BadRequestError('First name must be at least 1 character long')
    );
  });

  it('should should throw error if last name is not provided', async () => {
    //@ts-ignore
    const user = {
      firstName: 'Samuel',
      lastName: undefined,
      password: 'sam',
    };

    //@ts-ignore
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toEqual(new BadRequestError('Please provide last name'));
  });

  it('should should throw error if last name less than one character', async () => {
    const user = {
      firstName: 'Micheal',
      lastName: '',
      password: '6587',
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toEqual(
      new BadRequestError('Last name must be at least 1 character long')
    );
  });

  it('should should throw error if password is not provided', async () => {
    //@ts-ignore
    const user = {
      firstName: 'George',
      lastName: 'White',
      password: undefined,
    };

    //@ts-ignore
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toEqual(new BadRequestError('Please provide a password'));
  });
});
