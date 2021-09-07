import { getLogger } from '../../app/logger';
import authService from '../service';
import { IExpressReq, IExpressRes } from '../../app/types/express';

export const signUp = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'authCtrl.signUp';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    const data = await authService.signUp(logger, req.body);
    logger.end(logKey);
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
