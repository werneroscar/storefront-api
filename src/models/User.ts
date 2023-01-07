import { StatusCodes } from 'http-status-codes';

import { User, UserDetails } from '../types/user';
import { BadRequestError, CustomError } from '../errors';
import { userSchema, uuidSchema } from '../utils/validations';
import { UserRepository } from '../repositories/UserRepository';

export class UserStore {
  /**
   *
   * @returns all users
   */
  static async index(): Promise<User[]> {
    return await UserRepository.findAll();
  }

  //TODO: investigate why BadRequestError is converted to ERROR in compiled js
  static async show(id: string): Promise<User> {
    await uuidSchema.validateAsync({ id });
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new BadRequestError('There is no user with id: ' + id);
    }

    return user;
  }

  /**
   *
   * @param details details of the user to save
   * @returns User the saved user
   */
  static async create(details: UserDetails): Promise<User> {
    await userSchema.validateAsync(details, { abortEarly: false });

    const createdUser = await UserRepository.save(details);

    if (!createdUser) {
      throw new CustomError(
        'Failed to create user',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return createdUser;
  }
}
