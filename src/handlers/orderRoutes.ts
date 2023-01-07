import { Application, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderStore } from '../models/Order';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const orders = await OrderStore.create(req.body);
  res.status(StatusCodes.CREATED).json(orders);
};

const completeUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const orders = await OrderStore.completeUserOrder(req.body);
  res.status(StatusCodes.CREATED).json(orders);
};

const activeOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const orders = await OrderStore.currentOrdersByUser(req.params.userId);
  res.status(StatusCodes.OK).json(orders);
};

const orderRoutes = (app: Application) => {
  app.route('/orders').post(create);
  app.route('/orders/mark-as-complete').post(completeUserOrder);
  app.route('/orders/:userId/active').get(activeOrders);
  app.route('/orders/:userId/completed').get(activeOrders);
};

export default orderRoutes;
