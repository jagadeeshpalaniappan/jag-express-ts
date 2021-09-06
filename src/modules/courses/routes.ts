import { Router } from 'express';
import { getCourses } from './controller/getCourses';
import { createCourse } from './controller/createCourse';
import { isAuth } from '../auth/middleware/isAuth';
import { canAccess } from '../auth/middleware/canAccess';
import { bindAuthUser } from '../auth/middleware/bindAuthUser';

const courseRoutes = Router();
courseRoutes.get('', isAuth, canAccess(['ui.course.list']), bindAuthUser, getCourses);
courseRoutes.post('', createCourse);

export { courseRoutes };
