import { getLogger, getMeta } from '../../app/logger';
import { IExpressReq, IExpressRes } from '../../app/types/express';
import authService from '../service';

export const signUp = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'authCtrl.signUp';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const data = await authService.signUp(meta, req.body);
    logger.end();
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
