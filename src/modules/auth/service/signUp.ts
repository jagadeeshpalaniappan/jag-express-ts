import { Logger } from '../../app/types/logger';
import authDao from '../dao';
import { AuthDocument } from '../models/Auth';
import { getHashedPassword } from '../utils';

export const signUp = async (logger: Logger, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  try {
    logger.start(logKey);
    const { username, password, roles } = auth;
    const { hashedPassword, salt } = await getHashedPassword(logger, password);
    const authUser = { username, password: hashedPassword, salt, roles };
    const data = await authDao.createAuthUser(logger, authUser);
    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
