import { NextFunction } from 'express';
import { IExpressReq, IExpressRes } from '../../app/types/express';

export const canAccess = (resourceIds: string[]) => {
  return (req: IExpressReq, res: IExpressRes, next: NextFunction): void => {
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
