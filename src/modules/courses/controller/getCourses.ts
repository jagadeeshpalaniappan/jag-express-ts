import { getLogger, getMeta } from '../../app/logger';
import { IExpressReq, IExpressRes } from '../../app/types/express';
import courseService from '../service';

export const getCourses = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'courseCtrl.getCourses';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    // logger.info('::token::', req.token);
    // logger.info('::user::', req.user);
    const courses = await courseService.getCourses(meta);
    logger.info('courses', courses);
    logger.end();
    res.json({ courses }).status(200);
  } catch (error) {
    logger.failed();
    logger.error(logKey, error);
    res.json({ error }).status(500);
  }
};
