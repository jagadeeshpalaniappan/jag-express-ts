import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { getLogger } from '../../app/logger';
const logger = getLogger('courseCtrl.getCourses');
export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.start();
    const query = {};
    const courses = await Course.find(query);
    logger.end();
    res.json({ courses }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
