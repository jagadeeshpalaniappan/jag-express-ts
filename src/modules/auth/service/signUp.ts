import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import { emailJob } from '../../app/jobs/email';
import authDao from '../dao';
import { AuthDocument } from '../models/Auth';
import { getHashedPassword } from '../utils';

export const signUp = async (meta: Meta, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const { username, password, roles } = auth;
    const { hashedPassword, salt } = await getHashedPassword(meta, password);
    const authUser = { username, password: hashedPassword, salt, roles };
    const data = await authDao.createAuthUser(meta, authUser);

    // send: email
    await emailJob.add({ data: { username }, meta });

    logger.end();
    return data;
  } catch (error) {
    logger.failed();
    throw error;
  }
};
