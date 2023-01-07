import { CustomError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';

import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: 'error', details: err.details });
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', details: [{ message: err.message }] });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    details: [{ message: 'Something went wrong. Please try again later' }]
  });
};

export default errorHandlerMiddleware;
