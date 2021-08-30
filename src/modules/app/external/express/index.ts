import express, { Express } from 'express';
import { appConfig } from '../../config';
import { END, FAILED, getLogger, START } from '../../logger';
import { initApiPostMiddleware } from './apiPostMiddleware';
import { initApiPreMiddleware } from './apiPreMiddleware';
import { initApiRoutes } from './apiRoutesMiddleware';
import { initHealthCheckRoutes } from './healthCheckRoutes';
import { startExpressServer } from './startExpressServer';

const logger = getLogger('## EXPRESS:INTIALIZATION');

const PORT = appConfig.express.port;
export const initExpress = async (): Promise<Express> => {
  try {
    logger.info(START);
    const app = express();
    initHealthCheckRoutes(app);
    initApiPreMiddleware(app);
    initApiRoutes(app);
    initApiPostMiddleware(app);
    await startExpressServer(app);
    logger.info(END);
    logger.info(`http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.error(FAILED);
    throw error;
  }
};
