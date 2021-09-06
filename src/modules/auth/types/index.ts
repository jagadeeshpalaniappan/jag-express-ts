import { NextFunction, Request, Response } from 'express';

export interface IAuthToken {
  id: string;
  username: string;
  roles: string[];
  exp: number;
}

export interface IExpressReq extends Request {
  token: IAuthToken;
}

export type IExpressRes = Response;

export type IExpressNextFn = NextFunction;
