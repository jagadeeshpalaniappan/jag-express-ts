import express, { Express } from 'express';
import { getLogger } from '../logger';
import { apiRoutes, healthCheckRoutes } from '../routes';
import { appConfig } from './app';
import { postMiddlewares, preMiddlewares } from '../middlewares';
import { initMiddleware, initRoutes, startExpressServer } from '../utils/express';
import { initJobsUiMiddleware } from '../jobs';

const logKey = '## EXPRESS:INTIALIZATION';
const logger = getLogger();

const PORT = appConfig.express.port;
export const initExpress = async (): Promise<Express> => {
  try {
    logger.start(logKey);
    const app = express();
    initRoutes(app, '', [], healthCheckRoutes); // init: healthCheckRoutes
    initMiddleware(app, preMiddlewares); // init: preMiddlewares
    initJobsUiMiddleware(app); // init: jobsUI
    initRoutes(app, '/api', [], apiRoutes); // init: apiRoutes
    initMiddleware(app, postMiddlewares); // init: postMiddlewares
    await startExpressServer(app, PORT); // start: expressServer
    logger.end(logKey);
    logger.info(logKey, `http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
