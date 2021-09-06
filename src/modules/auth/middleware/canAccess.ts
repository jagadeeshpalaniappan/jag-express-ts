import { NextFunction, Response } from 'express';
import { IExpressReq } from '../types';

export const canAccess = (resourceIds: string[]) => {
  return (req: IExpressReq, res: Response, next: NextFunction): void => {
    let hasMatchingResourceId = false;
    if (req.token && req.token.roles && req.token.roles.length > 0) {
      const rolesSet = new Set(req.token.roles);
      hasMatchingResourceId = resourceIds.every(resourceId => rolesSet.has(resourceId));
    }

    if (hasMatchingResourceId) {
      next();
    } else {
      res
        .status(403)
        .send({ message: `User does not have access to '${resourceIds}' resource` })
        .end();
    }
  };
};
