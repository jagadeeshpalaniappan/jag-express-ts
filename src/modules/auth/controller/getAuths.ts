import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { getLogger } from '../../app/logger';
export const getAuths = async (req: Request, res: Response): Promise<void> => {
  const logKey = 'authCtrl.getAuths';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const query = {};
    const auths = await Auth.find(query);
    logger.end(logKey);
    res.json({ auths }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
