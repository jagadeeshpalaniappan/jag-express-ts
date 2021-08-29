import { Request, Response } from 'express';
import { Course } from './models/Course';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = {};
    const courses = await Course.find(query);
    console.log('db:course:end:getCourses');
    res.json({ courses }).status(200);
  } catch (error) {
    console.log('db:course:err:getAll');
    res.json({ error }).status(500);
  }
};

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseDoc = new Course(req.body);
    const data = await courseDoc.save();
    console.log('db:course:end:getCourses');
    res.json({ data }).status(200);
  } catch (error) {
    console.log('db:course:err:getAll');
    res.json({ error }).status(500);
  }
};
