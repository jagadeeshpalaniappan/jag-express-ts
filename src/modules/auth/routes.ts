import { ExpressRoute } from '../app/types/express';
import { getAuths } from './controller/getAuths';
import { signIn } from './controller/signIn';
import { signUp } from './controller/signUp';

export const routes: ExpressRoute[] = [
  {
    path: '/v1/auth',
    method: 'get',
    action: getAuths,
  },
  {
    path: '/v1/auth/signIn',
    method: 'post',
    action: signIn,
  },
  {
    path: '/v1/auth/signUp',
    method: 'post',
    action: signUp,
  },
];
