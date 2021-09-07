// import { AppConfig } from './types/config';

export const appConfig = {
  express: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  mongoose: {
    url: process.env.MONGODB_URI,
  },
  winston: {
    logLevel: process.env.LOG_LEVEL || 'silly',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGO,
  },
};
