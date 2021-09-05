import { Request, Response } from 'express';
import { getLogger } from '../../app/logger';
import authService from '../service';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const logKey = 'authCtrl.signUp';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const data = await authService.signUp(logger, req.body);
    logger.end(logKey);
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
