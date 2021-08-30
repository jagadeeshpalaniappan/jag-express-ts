import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { getLogger } from '../../app/logger';
const logger = getLogger('authCtrl.signIn');
export const getAuths = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('START');
    const query = {};
    const auths = await Auth.find(query);
    logger.info('END');
    res.json({ auths }).status(200);
  } catch (error) {
    logger.info('FAILED');
    res.json({ error }).status(500);
  }
};
