import { Express, NextFunction, Request, Response, Router } from 'express';
import { ExpressRoute, ExpressRouter, IExpressMiddleware } from '../types/express';

export const initMiddleware = (app: Express, middlewares: IExpressMiddleware[] = []): void => {
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
};

export const initRoutes = (
  app: Express,
  path: string = '',
  middlewares: IExpressMiddleware[] = [],
  routes: ExpressRoute[],
): void => {
  const router: ExpressRouter = Router();
  routes.forEach(route => {
    route.middlewares = route.middlewares || [];
    router[route.method](route.path, ...route.middlewares, async (req: Request, res: Response, next: NextFunction) => {
      try {
        await route.action(req, res);
      } catch (error) {
        next(error);
      }
    });
  });
  app.use(path, ...middlewares, router);
};

export const startExpressServer = (app: Express, port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Start Express server
    app.listen(port, () => {
      resolve();
    });
    app.on('error', err => {
      reject(err);
    });
  });
};
