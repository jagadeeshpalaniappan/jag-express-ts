import { AppError } from '../../common/error';
import { Logger } from '../../app/types/logger';
import { Course, CourseDocument } from '../models/Course';
export const getCourses = async (logger: Logger): Promise<CourseDocument[]> => {
  const logKey = 'courseDao.getCourses';
  try {
    logger.start(logKey);
    const query = {};
    const courses = await Course.find(query);
    logger.end(logKey);
    return courses;
  } catch (err) {
    logger.failed(logKey);
    logger.error(logKey, err);
    throw new AppError({ code: 'GET_COURSES_DB_ERR', msg: 'Get Courses DB Error', err });
  }
};
