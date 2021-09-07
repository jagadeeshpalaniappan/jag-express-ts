import { Logger } from '../../app/types/logger';
import { Auth, AuthDocument } from '../models/Auth';

export const getAuthUserByUsername = async (logger: Logger, username: string): Promise<AuthDocument> => {
  const logKey = 'authDao.getAuthUserByUsername';
  try {
    logger.start(logKey);
    const autDoc = await Auth.findOne({ username });
    logger.end(logKey);
    return autDoc;
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
