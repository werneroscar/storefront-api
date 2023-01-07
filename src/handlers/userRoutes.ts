import { Application, NextFunction, Request, Response } from 'express';
import { UserStore } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services/Auth';

const index = async (_req: Request, res: Response): Promise<Response> => {
  const users = await UserStore.index();
  return res.status(StatusCodes.OK).json(users);
};

const show = async (req: Request, res: Response): Promise<Response | void> => {
  const user = await UserStore.show(req.params.id);
  return res.status(StatusCodes.OK).json(user);
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = await UserStore.create(req.body);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const userRoutes = (app: Application) => {
  app
    .route('/users')
    .get(AuthService.authenticate, index)
    .post(AuthService.authenticate, create);
  app.route('/users/:id').get(AuthService.authenticate, show);
};

export default userRoutes;
