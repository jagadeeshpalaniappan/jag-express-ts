import { Request, Response } from 'express';
import courseService from '../service';
import { getLogger } from '../../app/logger';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  const logKey = 'courseCtrl.createCourse';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const data = await courseService.createCourse(logger, req.body);
    logger.end(logKey);
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
