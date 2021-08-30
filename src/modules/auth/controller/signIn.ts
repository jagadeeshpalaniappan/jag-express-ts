import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Auth, AuthDocument } from '../models/Auth';
import { appConfig } from '../../app/config';
import { getLogger } from '../../app/logger';
const logger = getLogger('authCtrl.signIn');

const generateToken = (authDoc: AuthDocument) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  /**
   * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
   * The cool thing is that you can add custom properties a.k.a metadata
   * Here we are adding the userId, role and name
   * Beware that the metadata is public and can be decoded without _the secret_
   * but the client cannot craft a JWT to fake a userId
   * because it doesn't have _the secret_ to sign it
   * more information here: https://softwareontheroad.com/you-dont-need-passport
   */
  return jwt.sign(
    {
      _id: authDoc._id, // We are gonna use this in the middleware 'isAuth'
      role: authDoc.role,
      name: authDoc.name,
      exp: exp.getTime() / 1000,
    },
    appConfig.jwt.secret,
  );
};
export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('START');
    const { username, password } = req.body;

    const autDoc = await Auth.findOne({ username });
    if (!autDoc) throw new Error('User not registered');

    const validPassword = await argon2.verify(autDoc.password, password);
    if (!validPassword) throw new Error('Invalid Password');

    const token = generateToken(autDoc);

    logger.info('END');
    res.json({ autDoc, token }).status(200);
  } catch (error) {
    logger.error('FAILED');
    logger.error(error);
    res.json({ error }).status(500);
  }
};
