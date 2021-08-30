// import { AppConfig } from './types/config';

export const appConfig = {
  express: {
    port: process.env.PORT || 3000,
  },
  mongoose: {
    url: process.env.MONGODB_URI,
  },
  winston: {
    logLevel: process.env.LOG_LEVEL || 'silly',
  },
};
