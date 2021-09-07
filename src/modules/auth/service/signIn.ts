import { Logger } from '../../app/types/logger';
import authDao from '../dao';
import { comparePassword, generateToken } from '../utils';

export const signIn = async (logger: Logger, auth: any): Promise<any> => {
  const logKey = 'authSvc.signIn';
  try {
    logger.start(logKey);
    const { username, password } = auth;

    const autDoc = await authDao.getAuthUserByUsername(logger, username);
    if (!autDoc) throw new Error('User not registered');

    const validPassword = await comparePassword(logger, autDoc.password, password);
    if (!validPassword) throw new Error('Invalid Password');

    const token = generateToken(autDoc._id, username, autDoc.roles);

    logger.end(logKey);
    return { autDoc, token };
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
