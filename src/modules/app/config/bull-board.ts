import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Express } from 'express';
import { jobs } from '../jobs';
import { appConfig } from './app';

const serverAdapter = new ExpressAdapter();
const basePath = appConfig.bull.ui.path;
serverAdapter.setBasePath(basePath);

const queues = jobs.map(job => new BullAdapter(job));
createBullBoard({ queues, serverAdapter });
export const initJobsUiMiddleware = (app: Express): void => {
  app.use(`/${basePath}`, serverAdapter.getRouter());
};
