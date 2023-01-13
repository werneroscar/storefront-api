import { ValidationError } from 'joi';

import { UserStore } from '../../models/User';
import { BadRequestError } from '../../errors';
import {
  getInvalidDetailsError,
  getInvalidIdError
} from '../../utils/get-errors';
import { UserRepository } from '../../repositories/UserRepository';

const userPassword = 'User@123';

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

describe('Userstore index method', () => {
  it('should be empty to start with', async () => {
    await UserRepository.truncate();
    expect(await UserStore.index()).toEqual([]);
  });

  it('should contain all created users', async () => {
    await UserRepository.truncate();
    const firstUser = await UserStore.create({
      firstName: 'Micheal',
      lastName: 'Lopez',
      password: userPassword
    });

    const secondUser = await UserStore.create({
      firstName: 'Chris',
      lastName: 'Bratford',
      password: userPassword
    });

    expect(await UserStore.index()).toEqual([
      {
        id: firstUser.id,
        firstName: firstUser.firstName,
        lastName: firstUser.lastName
      },
      {
        id: secondUser.id,
        firstName: secondUser.firstName,
        lastName: secondUser.lastName
      }
    ]);
  });
});

describe('Userstore show method', () => {
  it('should throw ValidationError if user id is invalid', async () => {
    const error = await getInvalidIdError(UserStore.show, '5');
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should throw BadRequestError if no user has the given id', async () => {
    const error = await getInvalidIdError(
      UserStore.show,
      'cb0471f2-b3f2-4c4b-b898-c23dbd8832f4'
    );
    expect(error).toEqual(
      new BadRequestError(
        'There is no user with id: cb0471f2-b3f2-4c4b-b898-c23dbd8832f4'
      )
    );
  });

  it('should return user given a correct id', async () => {
    const createdUser = await UserStore.create({
      firstName: 'Micheal',
      lastName: 'Lopez',
      password: userPassword
    });

    expect(await UserStore.show(createdUser.id)).toEqual({
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName
    });
  });
});

describe('User store create method', () => {
  it('should create a user', async () => {
    const createdUser = await UserStore.create({
      firstName: 'Danny',
      lastName: 'Bontii',
      password: userPassword
    });

    expect(createdUser).toEqual({
      id: createdUser.id,
      firstName: 'Danny',
      lastName: 'Bontii'
    });
  });

  it('should not return user password after creation', async () => {
    const createdUser = await UserStore.create({
      firstName: 'Jax',
      lastName: 'Brigss',
      password: userPassword
    });

    //@ts-ignore
    expect(createdUser.password).toBeUndefined();
  });
});

describe('User store first name check', () => {
  it('should should throw ValidationError if first name is not provided', async () => {
    //@ts-ignore
    const user = {
      firstName: undefined,
      lastName: 'Mitchel',
      password: userPassword
    };

    //@ts-ignore
    // expect(async ()=> await UserStore.create(user)).toThrowError();
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if first name less than one character', async () => {
    const user = {
      firstName: '',
      lastName: 'Logan',
      password: userPassword
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if first name contains number', async () => {
    const user = {
      firstName: 'Name1234',
      lastName: 'Logan',
      password: userPassword
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if first name is contains any special character other than hypen', async () => {
    const user = {
      firstName: 'd@niel',
      lastName: 'Logan',
      password: userPassword
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should NOT throw ValidationError if first name is contains hypen', async () => {
    const user = {
      firstName: 'First-name',
      lastName: 'Logan',
      password: userPassword
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeUndefined();
  });
});

describe('User store last name check', () => {
  it('should should throw ValidationError if last name is not provided', async () => {
    //@ts-ignore
    const user = {
      firstName: 'Samuel',
      lastName: undefined,
      password: userPassword
    };

    //@ts-ignore
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if last name less than one character', async () => {
    const user = {
      firstName: 'Micheal',
      lastName: '',
      password: '6587'
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if last name contains number', async () => {
    const user = {
      firstName: 'Logan',
      lastName: 'Name1234',
      password: '6587'
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if last name is contains any special character other than hypen', async () => {
    const user = {
      firstName: 'Logan',
      lastName: 'd@niel',
      password: '6587'
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should NOT throw ValidationError if last name contains hypen', async () => {
    const user = {
      lastName: 'Logan',
      firstName: 'Last-name',
      password: userPassword
    };

    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeUndefined();
  });
});

describe('User store password check', () => {
  //@ts-ignore
  const user = {
    firstName: 'George',
    lastName: 'White',
    password: ''
  };

  it('should should throw ValidationError if password is not provided', async () => {
    //@ts-ignore
    const user = {
      firstName: 'Joyce',
      lastName: 'Washington',
      password: undefined
    };
    //@ts-ignore
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if password is less than 8 characters long', async () => {
    user.password = '1bcDEF@';
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if password contains no number', async () => {
    user.password = 'QWavdje@ij';
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if password contains no special character', async () => {
    user.password = 'QWavdje8ij';
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if password contains no upper case character', async () => {
    user.password = 'qwavdje8i36j#';
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should should throw ValidationError if password contains no lower case character', async () => {
    user.password = 'ASDER8632@#';
    const error = await getInvalidDetailsError(UserStore.create, user);
    expect(error).toBeInstanceOf(ValidationError);
  });
});
