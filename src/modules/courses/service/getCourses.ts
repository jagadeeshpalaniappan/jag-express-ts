import { Logger } from '../../app/types/logger';
import courseDao from '../dao';
import { CourseDocument } from '../models/Course';
export const getCourses = async (logger: Logger): Promise<CourseDocument[]> => {
  const logKey = 'courseSvc.getCourses';
  try {
    logger.start(logKey);
    const courses = await courseDao.getCourses(logger);
    logger.end(logKey);
    return courses;
  } catch (err) {
    logger.failed(logKey);
    logger.error(logKey, err);
    throw err;
  }
};
