import { Logger } from '../../app/types/logger';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Auth, AuthDocument } from '../models/Auth';

const getHashedPassword = async (password: string) => {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });
  return { salt: salt.toString('hex'), hashedPassword };
};
export const signUp = async (logger: Logger, auth: any): Promise<AuthDocument> => {
  const logKey = 'authSvc.signUp';
  try {
    logger.start(logKey);
    const { username, password, roles } = auth;
    const { hashedPassword, salt } = await getHashedPassword(password);
    const authDoc = new Auth({ username, password: hashedPassword, salt, roles });
    const data = await authDoc.save();
    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
