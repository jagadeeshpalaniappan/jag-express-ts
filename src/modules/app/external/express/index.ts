import express, { Express } from 'express';
import { appConfig } from '../../config';
import { getLogger } from '../../logger';
import { initApiRoutes } from './apiRoutesMiddleware';
import { initHealthCheckRoutes } from './healthCheckRoutes';
import { initApiPostMiddleware } from './apiPostMiddleware';
import { initApiPreMiddleware } from './apiPreMiddleware';
import { startExpressServer } from './startExpressServer';
const logger = getLogger('express/index');
const PORT = appConfig.express.port;
export const initExpress = async (): Promise<Express> => {
  try {
    logger.info('## EXPRESS:INTIALIZATION::START');
    const app = express();
    initHealthCheckRoutes(app);
    initApiPreMiddleware(app);
    initApiRoutes(app);
    initApiPostMiddleware(app);
    await startExpressServer(app);
    logger.info('## EXPRESS:INTIALIZATION::END');
    logger.info(`## http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.error('## EXPRESS:INTIALIZATION::FAILED');
    throw error;
  }
};
