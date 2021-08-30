import errorHandler from 'errorhandler';
import { Express, Request, Response, NextFunction } from 'express';

const handleIsAuthMiddleware = (err: any, _req: Request, res: Response, next: NextFunction) => {
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
