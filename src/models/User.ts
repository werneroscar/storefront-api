import bcrypt from 'bcrypt';
import { User, UserDetails } from '../types/user';
import { BadRequestError } from '../errors';
import client from '../database';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  //@ts-ignore
  static async index(): Promise<User[]> {}

  static async create(details: UserDetails): Promise<User> {
    if (details.firstName === undefined || details.firstName === null) {
      throw new BadRequestError('Please provide first name');
    }
    if (details.firstName.length < 1) {
      throw new BadRequestError('First name must be at least 1 character long');
    }

    if (details.lastName === undefined || details.lastName === null) {
      throw new BadRequestError('Please provide last name');
    }
    if (details.lastName.length < 1) {
      throw new BadRequestError('Last name must be at least 1 character long');
    }

    if (details.password === undefined || details.password === null) {
        throw new BadRequestError('Please provide a password');
    }
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
      hash,
    ]);

    return {
      id: result.rows[0].id,
      firstName: result.rows[0].first_name,
      lastName: result.rows[0].last_name,
    };
  }

  //@ts-ignore
  static async show(id: string): Promise<User> {}
}
