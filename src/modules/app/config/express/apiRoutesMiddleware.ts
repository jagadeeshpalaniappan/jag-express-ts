import { Express, Router } from 'express';
import { courseRoutes } from '../../../courses/routes';
import { authRoutes } from '../../../auth/routes';

const apiRoutes = Router();
apiRoutes.use('/v1/courses', courseRoutes);
apiRoutes.use('/v1/auth', authRoutes);

export const initApiRoutes = (app: Express): void => {
  app.use('/api', apiRoutes);
};
