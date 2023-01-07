import CustomError from './custom';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
