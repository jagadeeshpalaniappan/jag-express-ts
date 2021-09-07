import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import { AppError } from '../../common/error';
import { Course, CourseDocument } from '../models/Course';
export const getCourses = async (meta: Meta): Promise<CourseDocument[]> => {
  const logKey = 'courseDao.getCourses';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const query = {};
    const courses = await Course.find(query);
    logger.end();
    return courses;
  } catch (err) {
    logger.failed();
    logger.error(logKey, err);
    throw new AppError({ code: 'GET_COURSES_DB_ERR', msg: 'Get Courses DB Error', err });
  }
};
