import bcrypt from 'bcrypt';
import { User, UserDetails } from '../types/user';
import { BadRequestError } from '../errors';
import client from '../database';
import { userSchema } from '../utils/validations';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  /**
   *
   * @param firstName the first name to validate
   * @returns void
   */
  static validateFirstName(firstName: string): void {
    if (firstName === undefined || firstName === null) {
      throw new BadRequestError('Please provide first name');
    }

    if (firstName.length < 1) {
      throw new BadRequestError('First name must be at least 1 character long');
    }

    if (!/^[a-zA-Z-]+$/.test(firstName)) {
      throw new BadRequestError(
        'First name must only contain alphabets and hyphens'
      );
    }
  }

  /**
   *
   * @param lastName the last name to validate
   * @returns void
   */
  static validateLastName(lastName: string): void {
    if (lastName === undefined || lastName === null) {
      throw new BadRequestError('Please provide last name');
    }

    if (lastName.length < 1) {
      throw new BadRequestError('Last name must be at least 1 character long');
    }

    if (!/^[a-zA-Z-]+$/.test(lastName)) {
      throw new BadRequestError(
        'Last name must only contain alphabets and hyphens'
      );
    }
  }

  /**
   *
   * @param password the password to validate
   * @returns void
   */
  static validatePassword(password: string): void {
    if (password === undefined || password === null) {
      throw new BadRequestError('Please provide a password');
    }

    if (password.length < 8) {
      throw new BadRequestError(
        'Password must be at least 8 characters, inlude at lease one number, ' +
          'special character, upper and lower case alphabets'
      );
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      throw new BadRequestError(
        'Password must be at least 8 characters, inlude at lease one number, ' +
          'special character, upper and lower case alphabets'
      );
    }
  }

  /**
   *
   * @returns all users
   */
  static async index(): Promise<User[]> {
    const conn = await client.connect();
    const findUsersQuery = 'SELECT id, first_name, last_name FROM users';
    const result = await conn.query(findUsersQuery);
    return result.rows.map((row) => {
      return { id: row.id, firstName: row.first_name, lastName: row.last_name };
    });
  }

  //@ts-ignore
  static async show(id: string): Promise<User> {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        id
      )
    ) {
      throw new BadRequestError('Invalid user id');
    }
    const conn = await client.connect();
    const findUserQuery =
      'SELECT id, first_name, last_name FROM users WHERE id=($1)';
    const result = await conn.query(findUserQuery, [id]);

    if (result.rowCount < 1) {
      throw new BadRequestError('There is no user with id: ' + id);
    }

    return {
      id: result.rows[0].id,
      firstName: result.rows[0].first_name,
      lastName: result.rows[0].last_name
    };
  }

  /**
   *
   * @param details details of the user to save
   * @returns User the saved user
   */
  static async create(details: UserDetails): Promise<User> {
    try {
      // UserStore.validateFirstName(details.firstName);
      // UserStore.validateLastName(details.lastName);
      // UserStore.validatePassword(details.password);
      await userSchema.validateAsync(details, { abortEarly: false });

      const conn = await client.connect();
      const createUserQuery =
        'INSERT INTO users (first_name, last_name, password_digest) ' +
        'VALUES($1, $2, $3) RETURNING id, first_name, last_name';

      const hash = bcrypt.hashSync(
        details.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(createUserQuery, [
        details.firstName,
        details.lastName,
        hash
      ]);

      return {
        id: result.rows[0].id,
        firstName: result.rows[0].first_name,
        lastName: result.rows[0].last_name
      };
    } catch (error) {
      throw error;
    }
  }
}
