import argon2 from 'argon2';
import { Logger } from '../../app/types/logger';

export const comparePassword = async (logger: Logger, password1: string, password2: string): Promise<boolean> => {
  const logKey = 'authSvc.comparePassword';
  try {
    logger.start(logKey);
    const isValidPassword = await argon2.verify(password1, password2);
    logger.end(logKey);
    return isValidPassword;
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
