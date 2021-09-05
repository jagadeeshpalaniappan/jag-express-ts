import { Course, CourseDocument } from '../models/Course';
import { Logger } from '../../app/types/logger';

export const createCourse = async (logger: Logger, course: CourseDocument): Promise<CourseDocument> => {
  const logKey = 'courseSvc.createCourse';
  try {
    logger.start(logKey);
    const courseDoc = new Course(course);
    const data = await courseDoc.save();
    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
