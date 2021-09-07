import { getLogger } from '../../app/logger';
import { Meta } from '../../app/types/meta';
import courseDao from '../dao';
import { CourseDocument } from '../models/Course';

export const createCourse = async (meta: Meta, course: CourseDocument): Promise<CourseDocument> => {
  const logKey = 'courseSvc.createCourse';
  const logger = getLogger(logKey, meta);
  try {
    logger.start();
    const data = await courseDao.createCourse(meta, course);
    logger.end();
    return data;
  } catch (error) {
    logger.failed();
    throw error;
  }
};
