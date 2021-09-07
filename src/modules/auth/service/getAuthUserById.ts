import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import authDao from '../dao';
import { AuthDocument } from '../models/Auth';

export const getAuthUserById = async (meta: Meta, id: string): Promise<AuthDocument> => {
  const logKey = 'authSvc.getAuthUserById';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const autDoc = await authDao.getAuthUserById(meta, id);
    if (!autDoc) throw new Error('User not registered');
    logger.end();
    return autDoc;
  } catch (error) {
    logger.failed();
    logger.error(error);
    throw error;
  }
};
