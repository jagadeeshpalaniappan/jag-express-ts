import { Router } from 'express';
import { getCourses } from './controller/getCourses';
import { createCourse } from './controller/createCourse';
import { isAuth } from '../auth/middleware/isAuth';

const courseRoutes = Router();
courseRoutes.get('', isAuth, getCourses);
courseRoutes.post('', createCourse);

export { courseRoutes };
