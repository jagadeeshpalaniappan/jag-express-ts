import { Request, Response } from 'express';
import { getLogger } from '../../app/logger';
import authService from '../service';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const logKey = 'authCtrl.signIn';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const data = await authService.signIn(logger, req.body);
    logger.end(logKey);
    res.json(data).status(200);
  } catch (error) {
    logger.failed(logKey);
    logger.error(error);
    res.json({ error }).status(500);
  }
};
