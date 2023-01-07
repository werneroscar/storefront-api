import { Application, NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { CategoryStore } from '../models/Category';
import { Category } from '../types/category';

const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Category[] | void> => {
  try {
    const categories = await CategoryStore.index();
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Category[] | void> => {
  try {
    const category = await CategoryStore.create(req.body.name);
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    next(error);
  }
};

const categoryRoutes = (app: Application) => {
  app.route('/categories').get(index).post(create);
};

export default categoryRoutes;
