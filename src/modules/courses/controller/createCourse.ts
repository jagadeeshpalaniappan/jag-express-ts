import { getLogger, getMeta } from '../../app/logger';
import { IExpressReq, IExpressRes } from '../../app/types/express';
import courseService from '../service';

export const createCourse = async (req: IExpressReq, res: IExpressRes): Promise<void> => {
  const logKey = 'courseCtrl.createCourse';
  const meta = getMeta(req);
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const data = await courseService.createCourse(meta, req.body);
    logger.end();
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
