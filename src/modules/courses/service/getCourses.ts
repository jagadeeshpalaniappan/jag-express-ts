import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import courseDao from '../dao';
import { CourseDocument } from '../models/Course';
export const getCourses = async (meta: Meta): Promise<CourseDocument[]> => {
  const logKey = 'courseSvc.getCourses';
  const logger = getLogger(logKey, meta);

  try {
    logger.start();
    const courses = await courseDao.getCourses(meta);
    logger.end();
    return courses;
  } catch (err) {
    logger.failed();
    logger.error(logKey, err);
    throw err;
  }
};
