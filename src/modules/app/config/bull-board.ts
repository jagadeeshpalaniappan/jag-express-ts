import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Express } from 'express';

import { emailJob } from '../jobs/email';

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(emailJob)],
  serverAdapter,
});

const basePath = 'jobs';
serverAdapter.setBasePath(basePath);
export const initJobsUiMiddleware = (app: Express): void => {
  app.use(`/${basePath}`, serverAdapter.getRouter());
};
