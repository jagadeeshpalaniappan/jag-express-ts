import { initMongoose } from './mongoose';
import { initExpress } from './express';
import { Express } from 'express';

export const initApp = async (): Promise<{ expressApp: Express }> => {
  try {
    console.log('## APP:INTIALIZATION::START');
    await initMongoose();
    const expressApp = await initExpress();
    console.log('## APP:INTIALIZATION::END');
    return { expressApp };
  } catch (error) {
    console.error('## APP:INTIALIZATION::FAILED');
    console.error(error);
    process.exit(1);
  }
};
