import { initMongoose } from './external/mongoose';
import { initExpress } from './external/express/init';

import { END, FAILED, getLogger, START } from './logger';
import { App } from './types/init';
const logger = getLogger('## APP:INTIALIZATION');

export const initApp = async (): Promise<App> => {
  try {
    logger.info(START);
    const mongooseDb = await initMongoose();
    const expressApp = await initExpress();
    logger.info(END);
    return { mongooseDb, expressApp };
  } catch (error) {
    logger.error(FAILED);
    logger.error(error);
    process.exit(1);
  }
};
