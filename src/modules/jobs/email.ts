import Bull from 'bull';
import { getLogger } from '../app/logger';

const bullConfig = { redis: { port: 6379, host: '127.0.0.1', password: '' } };
export const emailJob = new Bull('send-email', bullConfig);

const logKey = 'emailJob';

emailJob.process(function (job, done) {
  const { data, meta } = job.data;
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', meta.xb3Id);
  try {
    logger.start(logKey);
    logger.info(JSON.stringify(data));

    // transcode video asynchronously and report progress
    job.progress(20);

    setTimeout(() => {
      job.progress(60);
      logger.info(logKey, '60');
    }, 1000);

    setTimeout(() => {
      job.progress(100);
      logger.end(logKey);
      done(null, { result: 'EMAIL-SENT' }); // JOB:SUCCESS
    }, 10000);
  } catch (error) {
    logger.failed(logKey);
    done(new Error('error sending email')); // JOB:ERROR
  }
});
