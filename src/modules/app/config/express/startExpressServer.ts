import { Express } from 'express';
import { appConfig } from '../config';
const PORT = appConfig.express.port;
export const startExpressServer = (app: Express): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Start Express server
    app.listen(PORT, () => {
      resolve();
    });
    app.on('error', err => {
      reject(err);
    });
  });
};
