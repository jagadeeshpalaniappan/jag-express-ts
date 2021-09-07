import jwt from 'jsonwebtoken';
import { appConfig } from '../../app/config/app';
export const generateToken = (id: string, username: string, roles: Array<string>): string => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  const tokenPayload = {
    id,
    username,
    roles,
    exp: exp.getTime() / 1000,
  };

  // JWT(JSON Web Token), it is a json that is _hashed_ into a string, we can add any metadata here
  return jwt.sign(tokenPayload, appConfig.jwt.secret);
};
