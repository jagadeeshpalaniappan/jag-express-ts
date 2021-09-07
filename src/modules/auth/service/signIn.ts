import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import authDao from '../dao';
import { comparePassword, generateToken } from '../utils';

export const signIn = async (meta: Meta, auth: any): Promise<any> => {
  const logKey = 'authSvc.signIn';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const { username, password } = auth;

    const autDoc = await authDao.getAuthUserByUsername(meta, username);
    if (!autDoc) throw new Error('User not registered');

    const validPassword = await comparePassword(meta, autDoc.password, password);
    if (!validPassword) throw new Error('Invalid Password');

    const token = generateToken(autDoc._id, username, autDoc.roles);

    logger.end();
    return { autDoc, token };
  } catch (error) {
    logger.failed();
    logger.error(error);
    throw error;
  }
};
