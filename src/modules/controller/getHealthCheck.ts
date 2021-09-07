import { Request, Response } from 'express';
export const getHealthCheck = (_req: Request, res: Response): void => {
  res.json({ status: 'App is Running' }).status(200).end();
};
