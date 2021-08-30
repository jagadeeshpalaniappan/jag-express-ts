import bluebird from 'bluebird';
import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { appConfig } from '../common/config';

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
    console.error('## MONGOOSE:INTIALIZATION::START');
    const { connection } = await mongoose.connect(URL, OPTIONS);
    console.log('## MONGOOSE:INTIALIZATION::END');
    return connection.db;
  } catch (err) {
    console.error('## MONGOOSE:INTIALIZATION::FAILED');
    throw err;
  }
};
