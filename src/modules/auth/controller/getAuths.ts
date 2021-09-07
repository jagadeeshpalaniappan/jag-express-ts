import { IExpressReq, IExpressRes } from '../../app/types/express';
import { getLogger } from '../../app/logger';
import { Auth } from '../models/Auth';
export const getAuths = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
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
