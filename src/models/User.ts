import bcrypt from 'bcrypt';
import { User, UserDetails } from '../types/user';
import { BadRequestError } from '../errors';
import client from '../database';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  static async index(): Promise<User[]> {}
  static async create(details: UserDetails): Promise<User> {
    
  }
  static async show(id: string): Promise<User> {}
}
