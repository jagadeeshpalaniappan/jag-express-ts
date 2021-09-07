import { getLogger } from '../../app/logger';
import { IExpressReq, IExpressRes } from '../../app/types/express';
import authService from '../service';

export const signUp = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'authCtrl.signUp';
  const xb3Id = <string>req.headers['xb3id'];
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', xb3Id);
  const meta = { xb3Id };
  try {
    logger.start(logKey);
    const data = await authService.signUp(meta, req.body);
    logger.end(logKey);
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
