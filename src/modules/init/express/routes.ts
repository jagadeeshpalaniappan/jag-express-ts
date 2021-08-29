import { Application } from 'express';
import * as courseController from '../../courses/controller';

export const initApiRoutes = (app: Application): void => {
  app.get('/courses', courseController.getCourses);
  app.post('/courses', courseController.createCourse);
};
