import { Router } from 'express';
import { getAuths } from './controller/getAuths';
import { signIn } from './controller/signIn';
import { signUp } from './controller/signUp';

const authRoutes = Router();
authRoutes.get('/', getAuths);
authRoutes.post('/signUp', signUp);
authRoutes.post('/signIn', signIn);
export { authRoutes };
