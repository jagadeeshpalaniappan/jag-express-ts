import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import errorHandler from 'errorhandler';
import express, { Express } from 'express';
import lusca from 'lusca';
import { apiRoutes } from '../apiRoutes';
import { appConfig } from '../config';
import { getLogger } from '../logger';

const logger = getLogger('express/index');

const PORT = appConfig.express.port;

const initMiddleware = (app: Express) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.use((req, res, next) => {
    // res.locals.user = req.user;
    next();
  });
};
const initPostMiddleware = (app: Express) => {
  // Error Handler. Provides full stack
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
  }
};

const initApiRoutes = (app: Express) => {
  app.use('/api', apiRoutes);
};

const startExpressServer = (app: Express) => {
  return new Promise((resolve, reject) => {
    // Start Express server
    app.listen(PORT, () => {
      resolve(app);
    });
    app.on('error', err => {
      reject(err);
    });
  });
};

export const initExpress = async (): Promise<Express> => {
  try {
    logger.info('## EXPRESS:INTIALIZATION::START');
    const app = express();
    initMiddleware(app);
    initApiRoutes(app);
    initPostMiddleware(app);
    await startExpressServer(app);
    logger.info('## EXPRESS:INTIALIZATION::END');
    logger.info(`## http://localhost:${PORT} in ${app.get('env')} mode`);
    return app;
  } catch (error) {
    logger.error('## EXPRESS:INTIALIZATION::FAILED');
    throw error;
  }
};
