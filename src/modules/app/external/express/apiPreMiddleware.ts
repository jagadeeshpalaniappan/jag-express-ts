import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import { Express } from 'express';
import lusca from 'lusca';
export const initApiPreMiddleware = (app: Express): void => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.use((req, res, next) => {
    // res.locals.user = req.user;
    next();
  });
};
