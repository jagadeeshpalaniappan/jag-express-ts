import { getLogger } from '../../app/logger';
import authService from '../service';
import { IExpressReq, IExpressRes } from '../types';

export const signIn = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
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
