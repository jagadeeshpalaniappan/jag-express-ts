import express, { Express } from 'express';
import { initMiddleware, initPostMiddleware } from './middleware';
import { initApiRoutes } from './routes';
import { appConfig } from '../../common/config';

const PORT = appConfig.express.port;

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
    console.error('## EXPRESS:INTIALIZATION::START');
    const app = express();

    initMiddleware(app);
    initApiRoutes(app);
    initPostMiddleware(app);
    await startExpressServer(app);

    console.log('## EXPRESS:INTIALIZATION::END');
    console.log(`http://localhost:${PORT} in ${app.get('env')} mode`);

    return app;
  } catch (error) {
    console.error('## EXPRESS:INTIALIZATION::FAILED');
    throw error;
  }
};
