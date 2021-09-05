import bluebird from 'bluebird';
import { Db } from 'mongodb';
import mongoose from 'mongoose';
import { appConfig } from '../config';
import { getLogger } from '../logger';

const logKey = '## MONGOOSE:INTIALIZATION';
const logger = getLogger();

// use: bluebird promise in mongoose
mongoose.Promise = bluebird;

const URL = appConfig.mongoose.url;
const OPTIONS = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

/**
 * initialize mongodb connection using mongoose
 * @returns db
 */
export const initMongoose = async (): Promise<Db> => {
  try {
    logger.start(logKey);
    const { connection } = await mongoose.connect(URL, OPTIONS);
    logger.end(logKey);
    return connection.db;
  } catch (err) {
    logger.failed(logKey);
    throw err;
  }
};
