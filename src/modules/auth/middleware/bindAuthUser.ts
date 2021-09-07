import { getLogger } from '../../app/logger';
import authService from '../service';
import { IExpressReq, IExpressRes, IExpressNextFn } from '../../app/types/express';

export const bindAuthUser = async (req: IExpressReq, res: IExpressRes, next: IExpressNextFn): Promise<void> => {
  const logKey = 'authMw.bindAuthUser';
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
