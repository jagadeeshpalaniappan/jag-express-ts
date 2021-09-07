import courseCtrl from './controller';
import { bindAuthUser } from '../auth/middleware/bindAuthUser';
import { canAccess } from '../auth/middleware/canAccess';
import { isAuth } from '../auth/middleware/isAuth';
import { ExpressRoute } from '../app/types/express';

export const routes: ExpressRoute[] = [
  {
    path: '/v1/courses',
    method: 'get',
    middlewares: [isAuth, canAccess(['ui.course.list']), bindAuthUser],
    action: courseCtrl.getCourses,
  },
  {
    path: '/v1/courses/:id',
    method: 'get',
    action: courseCtrl.getCourses,
  },
  {
    path: '/v1/courses',
    method: 'post',
    action: courseCtrl.createCourse,
  },
];
