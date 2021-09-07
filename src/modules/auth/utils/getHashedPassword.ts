import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Logger } from '../../app/types/logger';

export const getHashedPassword = async (logger: Logger, password: string): Promise<any> => {
  const logKey = 'authSvc.getHashedPassword';
  try {
    logger.start(logKey);
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });
    return { salt: salt.toString('hex'), hashedPassword };
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
