import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';

export const getHashedPassword = async (meta: Meta, password: string): Promise<any> => {
  const logKey = 'authSvc.getHashedPassword';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });
    return { salt: salt.toString('hex'), hashedPassword };
  } catch (error) {
    logger.failed();
    logger.error(error);
    throw error;
  }
};
