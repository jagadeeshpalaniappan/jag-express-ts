import { Meta } from '../../app/types/meta';
import { getLogger } from '../../app/logger';
import { Auth, AuthDocument } from '../models/Auth';

export const createAuthUser = async (meta: Meta, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const authDoc = new Auth(auth);
    const data = await authDoc.save();
    logger.end();
    return data;
  } catch (error) {
    logger.failed();
    throw error;
  }
};
