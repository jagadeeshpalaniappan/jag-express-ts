import { NextFunction, Request, Response } from 'express';

export interface IAuthToken {
  id: string;
  username: string;
  roles: string[];
  exp: number;
}
