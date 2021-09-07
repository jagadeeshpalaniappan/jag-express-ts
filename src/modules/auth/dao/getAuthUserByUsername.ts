import { Meta } from '../../app/types/meta';
import { getLogger } from '../../app/logger';
import { Auth, AuthDocument } from '../models/Auth';

export const getAuthUserByUsername = async (meta: Meta, username: string): Promise<AuthDocument> => {
  const logKey = 'authDao.getAuthUserByUsername';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const autDoc = await Auth.findOne({ username });
    logger.end();
    return autDoc;
  } catch (error) {
    logger.failed();
    logger.error(error);
    throw error;
  }
};
