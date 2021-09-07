import appCtrl from './controller';
import { routes as courseRoutes } from '../courses/routes';
import { routes as authRoutes } from '../auth/routes';
import { ExpressRoute } from './types/express';

export const healthCheckRoutes: ExpressRoute[] = [
  {
    path: '/health',
    method: 'get',
    action: appCtrl.getHealthCheck,
  },
  {
    path: '/status',
    method: 'get',
    action: appCtrl.getHealthCheck,
  },
];

export const apiRoutes: ExpressRoute[] = [...authRoutes, ...courseRoutes];
