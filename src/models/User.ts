import bcrypt from 'bcrypt';
import { User, UserDetails } from '../types/user';
import { BadRequestError } from '../errors';
import client from '../database';
import { userSchema, uuidSchema } from '../utils/validations';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  /**
   *
   * @returns all users
   */
  static async index(): Promise<User[]> {
    const conn = await client.connect();
    const findUsersQuery = 'SELECT id, first_name, last_name FROM users';
    const result = await conn.query(findUsersQuery);
    conn.release();
    return result.rows.map((row) => {
      return { id: row.id, firstName: row.first_name, lastName: row.last_name };
    });
  }

  //@ts-ignore
  static async show(id: string): Promise<User> {
    await uuidSchema.validateAsync({ id });

    const conn = await client.connect();
    const findUserQuery =
      'SELECT id, first_name, last_name FROM users WHERE id=($1)';
    const result = await conn.query(findUserQuery, [id]);

    if (result.rowCount < 1) {
      throw new BadRequestError('There is no user with id: ' + id);
    }
    conn.release();
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
    conn.release();
    return {
      id: result.rows[0].id,
      firstName: result.rows[0].first_name,
      lastName: result.rows[0].last_name
    };
  }
}
