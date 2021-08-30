import bluebird from 'bluebird';
import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { appConfig } from '../config';
import { END, FAILED, getLogger, START } from '../logger';
const logger = getLogger('## MONGOOSE:INTIALIZATION');

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
    logger.info(START);
    const { connection } = await mongoose.connect(URL, OPTIONS);
    logger.info(END);
    return connection.db;
  } catch (err) {
    logger.error(FAILED);
    throw err;
  }
};
