import { Application, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderStore } from '../models/Order';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const orders = await OrderStore.create(req.body);
    res.status(StatusCodes.CREATED).json(orders);
  } catch (error) {
    next(error);
  }
};

const completeUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const orders = await OrderStore.completeUserOrder(req.body);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
};

const activeOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const orders = await OrderStore.currentOrdersByUser(req.params.userId);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
};

const orderRoutes = (app: Application) => {
  app.route('/orders').post(create);
  app.route('/orders/complete-order').post(completeUserOrder);
  app.route('/orders/:userId/active').get(activeOrders);
  app.route('/orders/:userId/complete').get(activeOrders);
};

export default orderRoutes;
