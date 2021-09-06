import { NextFunction, Response } from 'express';
import { IExpressReq } from '../types';
import authService from '../service';
import { getLogger } from '../../app/logger';

export const bindAuthUser = async (req: IExpressReq, res: Response, next: NextFunction): Promise<void> => {
  const logKey = 'authCtrl.getAuths';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);

    if (!req.token || !req.token.id) throw new Error('User is not authenticated');

    const userDoc = await authService.getAuthUserById(logger, req.token.id);
    if (!userDoc) throw new Error('User record not found');

    req.user = userDoc;

    logger.end(logKey);
    next();
  } catch (error) {
    logger.failed(logKey);
    const message = error.message || 'User record not found';
    res.status(401).send({ message }).end();
  }
};
