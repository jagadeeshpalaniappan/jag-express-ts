import { IExpressReq, IExpressRes } from '../../app/types/express';
import { getLogger, getMeta } from '../../app/logger';
import { Auth } from '../models/Auth';
export const getAuths = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'authCtrl.getAuths';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const query = {};
    const auths = await Auth.find(query);
    logger.end();
    res.json({ auths }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
