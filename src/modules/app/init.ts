import { initMongoose } from './external/mongoose';
import { initExpress } from './external/express';

import { getLogger } from './logger';
import { App } from './types/init';
const logger = getLogger('init');

export const initApp = async (): Promise<App> => {
  try {
    logger.info('## APP:INTIALIZATION::START');
    const mongooseDb = await initMongoose();
    const expressApp = await initExpress();
    logger.info('## APP:INTIALIZATION::END');
    return { mongooseDb, expressApp };
  } catch (error) {
    logger.error('## APP:INTIALIZATION::FAILED');
    logger.error(error);
    process.exit(1);
  }
};
