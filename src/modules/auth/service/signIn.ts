import argon2 from 'argon2';
import { Auth } from '../models/Auth';
import { Logger } from '../../app/types/logger';
import { generateToken } from '../utils/generateToken';

export const signIn = async (logger: Logger, auth: any): Promise<any> => {
  const logKey = 'authSvc.signIn';
  try {
    logger.start(logKey);
    const { username, password } = auth;

    const autDoc = await Auth.findOne({ username });
    if (!autDoc) throw new Error('User not registered');

    const validPassword = await argon2.verify(autDoc.password, password);
    if (!validPassword) throw new Error('Invalid Password');

    const { _id, roles } = autDoc;
    const token = generateToken(_id, username, roles);

    logger.end(logKey);
    return { autDoc, token };
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    throw error;
  }
};
