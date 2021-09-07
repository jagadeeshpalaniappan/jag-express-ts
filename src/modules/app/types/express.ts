import { IRouter, NextFunction, Request, Response, RouterOptions } from 'express';
import { IAuthToken } from '../../auth/types';
export type HttpMethods = 'get' | 'post' | 'put' | 'delete';

export interface IExpressReq extends Request {
  token: IAuthToken;
}

export type IExpressRes = Response;

export type IExpressNextFn = NextFunction;

export type ExpressRouter = IRouter &
  {
    [key in HttpMethods]: RouterOptions;
  };

type Middleware = (request: IExpressReq, response: IExpressRes, next: IExpressNextFn) => void;
type ErrorMiddleware = (error: any, request: IExpressReq, response: IExpressRes, next: IExpressNextFn) => void;
export type IExpressMiddleware = Middleware | ErrorMiddleware;

export interface ExpressRoute {
  path: string;
  method: HttpMethods;
  middlewares?: IExpressMiddleware[];
  action: any;
}
