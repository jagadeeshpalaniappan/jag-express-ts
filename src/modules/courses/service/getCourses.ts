import { Logger } from '../../app/types/logger';
import { Course, CourseDocument } from '../models/Course';
export const getCourses = async (logger: Logger): Promise<CourseDocument[]> => {
  const logKey = 'courseSvc.getCourses';
  try {
    logger.start(logKey);
    const query = {};
    const courses = await Course.find(query);
    logger.end(logKey);
    return courses;
  } catch (error) {
    logger.failed(logKey);
  }
};
