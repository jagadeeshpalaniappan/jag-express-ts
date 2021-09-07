import { Express, Request, Response } from 'express';
export const initHealthCheckRoutes = (app: Express): void => {
  app.get('/status', (req: Request, res: Response) => {
    res.json({ status: 'App is Running' }).status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.json({ status: 'App is Running' }).status(200).end();
  });
};
