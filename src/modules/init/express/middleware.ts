import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import errorHandler from 'errorhandler';
import { Application } from 'express';
import lusca from 'lusca';

export const initMiddleware = (app: Application): void => {
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

export const initPostMiddleware = (app: Application): void => {
  // Error Handler. Provides full stack
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
  }
};
