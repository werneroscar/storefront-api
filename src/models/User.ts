import { User, UserDetails } from '../types/user';
export class UserStore {
  static async index(): Promise<User[]> {}
  static async create(details: UserDetails): Promise<User> {}
  static async show(id: string): Promise<User> {}
}
