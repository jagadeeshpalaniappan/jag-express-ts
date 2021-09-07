import { IExpressReq, IExpressRes } from '../../app/types/express';
import { getLogger, getMeta } from '../../app/logger';
import authService from '../service';

export const signIn = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'authCtrl.signIn';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const data = await authService.signIn(meta, req.body);
    logger.end();
    res.json(data).status(200);
  } catch (error) {
    logger.failed();
    logger.error(error);
    res.json({ error }).status(500);
  }
};
