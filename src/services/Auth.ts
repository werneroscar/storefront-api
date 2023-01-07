import jwt from 'jsonwebtoken';
const { ADMIN_PASSWORD, JWT_SECRET } = process.env;
import { UnauthenticatedError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export class AuthService {
  /**
   * @param password the password used to authenticate
   * @return string the JWT token
   */
  static generateToken(password: string): string {
    if (password !== ADMIN_PASSWORD) {
      throw new UnauthenticatedError('Incorrect password');
    }
    return jwt.sign({}, JWT_SECRET as string, {
      expiresIn: '1h'
    });
  }

  static async authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new UnauthenticatedError('No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, JWT_SECRET as string);

      return next();
    } catch (error) {
      return next(new UnauthenticatedError('Unauthorized access'));
    }
  }
}
