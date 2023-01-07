import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (_req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).render('pages/notfound');
};

export default notFound;
