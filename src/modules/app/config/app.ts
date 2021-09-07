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
  bull: {
    redis: {
      port: process.env.BULL_REDIS_PORT || 6379,
      host: process.env.BULL_REDIS_HOST || '127.0.0.1',
      password: process.env.BULL_REDIS_PASSWORD || '',
    },
    ui: {
      path: 'jobs',
    },
  },
};
