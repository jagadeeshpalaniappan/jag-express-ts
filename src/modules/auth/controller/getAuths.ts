import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { getLogger } from '../../app/logger';
const logger = getLogger('authCtrl.signIn');
export const getAuths = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.start();
    const query = {};
    const auths = await Auth.find(query);
    logger.end();
    res.json({ auths }).status(200);
  } catch (error) {
    logger.failed();
    res.json({ error }).status(500);
  }
};
