import { IExpressReq, IExpressRes, IExpressNextFn } from '../../app/types/express';

export const authErrorHandler = (err: any, _req: IExpressReq, res: IExpressRes, next: IExpressNextFn) => {
  // Handle 401 thrown by 'express-jwt' library
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end();
  }
  return next(err);
};
