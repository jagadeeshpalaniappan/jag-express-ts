import { Router } from 'express';
import { getCourses } from './controller/getCourses';
import { createCourse } from './controller/createCourse';

const courseRoutes = Router();
courseRoutes.get('', getCourses);
courseRoutes.post('', createCourse);

export { courseRoutes };
