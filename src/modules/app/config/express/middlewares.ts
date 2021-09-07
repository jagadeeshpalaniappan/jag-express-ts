import compression from 'compression'; // compresses requests
import express, { NextFunction, Request, Response } from 'express';
import lusca from 'lusca';
import { authErrorHandler } from '../../../auth/middleware/authErrorHandler';
import { IExpressMiddleware } from '../../types/express';

const customMiddleware = (): IExpressMiddleware => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    // res.locals.user = req.user;
    next();
  };
};

export const preMiddlewares = [
  compression(),
  express.json(),
  lusca.xframe('SAMEORIGIN'),
  lusca.xssProtection(true),
  customMiddleware(),
];

export const postMiddlewares = [authErrorHandler];
