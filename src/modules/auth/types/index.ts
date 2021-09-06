import { Request } from 'express';

export interface IAuthToken {
  id: string;
  username: string;
  roles: string[];
  exp: number;
}

export interface IExpressReq extends Request {
  token: IAuthToken;
}
