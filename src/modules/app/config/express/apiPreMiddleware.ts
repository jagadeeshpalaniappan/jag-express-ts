import compression from 'compression'; // compresses requests
import express, { Express } from 'express';
import lusca from 'lusca';
export const initApiPreMiddleware = (app: Express): void => {
  app.use(compression());
  app.use(express.json());

  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.use((req, res, next) => {
    // res.locals.user = req.user;
    next();
  });
};
