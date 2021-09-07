import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import { Course, CourseDocument } from '../models/Course';

export const createCourse = async (meta: Meta, course: CourseDocument): Promise<CourseDocument> => {
  const logKey = 'courseDao.createCourse';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const courseDoc = new Course(course);
    const data = await courseDoc.save();
    logger.end();
    return data;
  } catch (error) {
    logger.failed();
    throw error;
  }
};
