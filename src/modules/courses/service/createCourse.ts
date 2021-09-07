import courseDao from '../dao';
import { Logger } from '../../app/types/logger';
import { CourseDocument } from '../models/Course';

export const createCourse = async (logger: Logger, course: CourseDocument): Promise<CourseDocument> => {
  const logKey = 'courseSvc.createCourse';
  try {
    logger.start(logKey);
    const data = await courseDao.createCourse(logger, course);
    logger.end(logKey);
    return data;
  } catch (error) {
    logger.failed(logKey);
    throw error;
  }
};
