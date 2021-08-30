import { Router } from 'express';
import { courseRoutes } from '../courses/routes';

const apiRoutes = Router();
apiRoutes.use('/v1/courses', courseRoutes);

export { apiRoutes };
