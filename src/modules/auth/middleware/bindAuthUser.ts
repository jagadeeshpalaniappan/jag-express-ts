import { getLogger, getMeta } from '../../app/logger';
import authService from '../service';
import { IExpressReq, IExpressRes, IExpressNextFn } from '../../app/types/express';

export const bindAuthUser = async (req: IExpressReq, res: IExpressRes, next: IExpressNextFn): Promise<void> => {
  const logKey = 'authMw.bindAuthUser';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();

    if (!req.token || !req.token.id) throw new Error('User is not authenticated');

    const userDoc = await authService.getAuthUserById(meta, req.token.id);
    if (!userDoc) throw new Error('User record not found');

    req.user = userDoc;

    logger.end();
    next();
  } catch (error) {
    logger.failed();
    const message = error.message || 'User record not found';
    res.status(401).send({ message }).end();
  }
};
