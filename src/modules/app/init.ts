import { initExpress } from './config/express';
import { initMongoose } from './config/mongoose';
import { getLogger } from './logger';
import { App } from './types/init';

const logKey = '## APP:INTIALIZATION';
const logger = getLogger();

export const initApp = async (): Promise<App> => {
  try {
    logger.start(logKey);
    const mongooseDb = await initMongoose();
    const expressApp = await initExpress();
    logger.end(logKey);
    return { mongooseDb, expressApp };
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    process.exit(1);
  }
};
