import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { getLogger } from '../../app/logger';
const logger = getLogger('courseCtrl.createCourse');
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.start();
    const courseDoc = new Course(req.body);
    const data = await courseDoc.save();
    logger.end();
    res.json({ data }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
