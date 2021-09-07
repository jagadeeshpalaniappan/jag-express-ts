import { initExpress } from './config/express';
import { initMongoose } from './config/mongoose';
import { getLogger } from './logger';
import { App } from './types/init';

const logKey = '## APP:INTIALIZATION';
const logger = getLogger(logKey);

export const initApp = async (): Promise<App> => {
  try {
    logger.start();
    const mongooseDb = await initMongoose();
    const expressApp = await initExpress();
    logger.end();
    return { mongooseDb, expressApp };
  } catch (error) {
    logger.failed();
    logger.error(error);
    process.exit(1);
  }
};
