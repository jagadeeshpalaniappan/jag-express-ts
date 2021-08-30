import bluebird from 'bluebird';
import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { appConfig } from '../config';
import { getLogger } from '../logger';
const logger = getLogger('init');

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
    logger.info('## MONGOOSE:INTIALIZATION::START');
    const { connection } = await mongoose.connect(URL, OPTIONS);
    logger.info('## MONGOOSE:INTIALIZATION::END');
    return connection.db;
  } catch (err) {
    logger.error('## MONGOOSE:INTIALIZATION::FAILED');
    throw err;
  }
};
