import jwt from 'jsonwebtoken';
const { ADMIN_PASSWORD, JWT_SECRET } = process.env;
import { UnauthenticatedError } from '../errors';

export class AuthService {
  static generateToken(password: string): string {
    if (password !== ADMIN_PASSWORD) {
      throw new UnauthenticatedError('Incorrect password');
    }
    return jwt.sign({ role: 'ADMIN' }, JWT_SECRET as string, {
      expiresIn: '1h'
    });
  }
}
