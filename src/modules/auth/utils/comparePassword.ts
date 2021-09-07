import argon2 from 'argon2';
import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';

export const comparePassword = async (meta: Meta, password1: string, password2: string): Promise<boolean> => {
  const logKey = 'authSvc.comparePassword';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const isValidPassword = await argon2.verify(password1, password2);
    logger.end();
    return isValidPassword;
  } catch (error) {
    logger.failed();
    logger.error(error);
    throw error;
  }
};
