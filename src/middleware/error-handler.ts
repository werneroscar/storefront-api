import { CustomError, UnauthenticatedError } from '../errors';
import { StatusCodes } from 'http-status-codes';

import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong. Please try again later'
  });
};

export default errorHandlerMiddleware;
