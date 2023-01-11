import { Request, Response, NextFunction, Application } from 'express';

import { StatusCodes } from 'http-status-codes';

import { AuthService } from '../services/Auth';

const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = AuthService.generateToken(req.query.password as string);
    res.status(StatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};

const authRoutes = (app: Application) => {
    app.route('/auth/token').get(getToken);
}

export default authRoutes;