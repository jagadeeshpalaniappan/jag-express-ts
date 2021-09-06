import { getLogger } from '../../app/logger';
import { IExpressReq, IExpressRes } from '../../auth/types';
import courseService from '../service';

export const getCourses = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'courseCtrl.getCourses';
  const logger = getLogger();
  logger.setTraceInfo('xb3Id', <string>req.headers['xb3id']);
  try {
    logger.start(logKey);
    logger.info('::toke::', JSON.stringify(req.token));
    logger.info('::user::', JSON.stringify(req.user));
    const courses = await courseService.getCourses(logger);
    logger.end(logKey);
    res.json({ courses }).status(200);
  } catch (error) {
    logger.failed(logKey);
    res.json({ error }).status(500);
  }
};
