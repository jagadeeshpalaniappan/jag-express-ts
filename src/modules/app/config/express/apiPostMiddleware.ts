import { log } from 'console';
import errorHandler from 'errorhandler';
import { Express } from 'express';
import { IExpressNextFn, IExpressReq, IExpressRes } from '../../../auth/types';

const handleIsAuthMiddleware = (err: any, _req: IExpressReq, res: IExpressRes, next: IExpressNextFn) => {
  // Handle 401 thrown by 'express-jwt' library
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end();
  }
  return next(err);
};

export const initApiPostMiddleware = (app: Express): void => {
  // Error Handler. Provides full stack
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use(handleIsAuthMiddleware);
};
