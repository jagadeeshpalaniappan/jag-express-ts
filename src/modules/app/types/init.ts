import { Express } from 'express';
import { Db } from 'mongodb';
export interface App {
  mongooseDb: Db;
  expressApp: Express;
}
