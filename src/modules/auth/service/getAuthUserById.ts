import { Logger } from '../../app/types/logger';
import { Auth, AuthDocument } from '../models/Auth';

export const getAuthUserById = async (logger: Logger, id: string): Promise<AuthDocument> => {
  const logKey = 'authSvc.getAuthUserById';
  try {
    logger.start(logKey);
    const autDoc = await Auth.findById(id);
    if (!autDoc) throw new Error('User not registered');
    logger.end(logKey);
    return autDoc;
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
