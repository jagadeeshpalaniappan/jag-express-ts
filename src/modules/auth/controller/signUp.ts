import { Request, Response } from 'express';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Auth } from '../models/Auth';
import { getLogger } from '../../app/logger';
const logger = getLogger('authCtrl.signIn');

const getHashedPassword = async (password: string) => {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });
  return { salt: salt.toString('hex'), hashedPassword };
};
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('START');
    const { username, password, roles } = req.body;

    const { hashedPassword, salt } = await getHashedPassword(password);

    const authDoc = new Auth({ username, password: hashedPassword, salt, roles });
    const data = await authDoc.save();
    logger.info('END');
    res.json({ data }).status(200);
  } catch (error) {
    logger.info('FAILED');
    res.json({ error }).status(500);
  }
};
