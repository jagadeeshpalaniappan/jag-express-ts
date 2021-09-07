import express, { Express } from 'express';
import { getLogger } from '../logger';
import { apiRoutes, healthCheckRoutes } from '../routes';
import { appConfig } from './app';
import { postMiddlewares, preMiddlewares } from '../middlewares';
import { initMiddleware, initRoutes, startExpressServer } from '../utils/express';
import { initJobsUiMiddleware } from './bull-board';

const logKey = '## EXPRESS:INTIALIZATION';
const logger = getLogger(logKey);

const PORT = appConfig.express.port;
export const initExpress = async (): Promise<Express> => {
  try {
    logger.start();
    const app = express();
    initRoutes(app, '', [], healthCheckRoutes); // init: healthCheckRoutes
    initMiddleware(app, preMiddlewares); // init: preMiddlewares
    initJobsUiMiddleware(app); // init: jobsUI
    initRoutes(app, '/api', [], apiRoutes); // init: apiRoutes
    initMiddleware(app, postMiddlewares); // init: postMiddlewares
    await startExpressServer(app, PORT); // start: expressServer
    logger.end();
    logger.info(logKey, `http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.failed();
    throw error;
  }
};
