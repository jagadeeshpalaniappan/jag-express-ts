import { Logger } from '../../app/types/logger';
import { Auth, AuthDocument } from '../models/Auth';

export const createAuthUser = async (logger: Logger, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  try {
    logger.start(logKey);
    const authDoc = new Auth(auth);
    const data = await authDoc.save();
    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
