import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

/**
 * Error handling middleware
 * @function
 * @param err Error object
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
