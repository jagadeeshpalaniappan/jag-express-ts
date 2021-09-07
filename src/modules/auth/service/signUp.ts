import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import { emailJob } from '../../jobs/email';
import authDao from '../dao';
import { AuthDocument } from '../models/Auth';
import { getHashedPassword } from '../utils';

export const signUp = async (meta: Meta, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  const logger = getLogger();
  try {
    logger.start(logKey);
    const { username, password, roles } = auth;
    const { hashedPassword, salt } = await getHashedPassword(logger, password);
    const authUser = { username, password: hashedPassword, salt, roles };
    const data = await authDao.createAuthUser(logger, authUser);

    // send: email
    const job = await emailJob.add({ data: { username }, meta });
    logger.info(logKey, job);

    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
