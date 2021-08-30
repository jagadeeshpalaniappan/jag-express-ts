import argon2 from 'argon2';
import { Request, Response } from 'express';

import { getLogger } from '../../app/logger';
import { Auth } from '../models/Auth';
import { generateToken } from '../utils/generateToken';
const logger = getLogger('authCtrl.signIn');

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('START');
    const { username, password } = req.body;

    const autDoc = await Auth.findOne({ username });
    if (!autDoc) throw new Error('User not registered');

    const validPassword = await argon2.verify(autDoc.password, password);
    if (!validPassword) throw new Error('Invalid Password');

    const { _id, roles } = autDoc;
    const token = generateToken(_id, username, roles);

    logger.info('END');
    res.json({ autDoc, token }).status(200);
  } catch (error) {
    logger.error('FAILED');
    logger.error(error);
    res.json({ error }).status(500);
  }
};
