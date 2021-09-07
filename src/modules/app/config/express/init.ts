import express, { Express } from 'express';
import { appConfig } from '../app';
import { getLogger } from '../../logger';
import { initApiPostMiddleware } from './apiPostMiddleware';
import { initApiPreMiddleware } from './apiPreMiddleware';
import { initApiRoutes } from './apiRoutesMiddleware';
import { initHealthCheckRoutes } from './healthCheckRoutes';
import { startExpressServer } from './startExpressServer';

const logKey = '## EXPRESS:INTIALIZATION';
const logger = getLogger();

const PORT = appConfig.express.port;
export const initExpress = async (): Promise<Express> => {
  try {
    logger.start(logKey);
    const app = express();
    initHealthCheckRoutes(app);
    initApiPreMiddleware(app);
    initApiRoutes(app);
    initApiPostMiddleware(app);
    await startExpressServer(app);
    logger.end(logKey);
    logger.info(logKey, `http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
