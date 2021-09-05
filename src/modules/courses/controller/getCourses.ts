import { Request, Response } from 'express';
import courseService from '../service';
import { getLogger } from '../../app/logger';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  const logKey = 'courseCtrl.getCourses';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const courses = await courseService.getCourses(logger);
    logger.end(logKey);
    res.json({ courses }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
