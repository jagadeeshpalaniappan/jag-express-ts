import jwt from 'jsonwebtoken';
import { appConfig } from '../../app/config';
export const generateToken = (id: string, username: string, roles: Array<string>) => {
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
      id,
      username,
      roles,
      exp: exp.getTime() / 1000,
    },
    appConfig.jwt.secret,
  );
};
