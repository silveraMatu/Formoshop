import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '../db/entity/User/user.ts';

/**
 * @example
 */
export const authorizeRoles = (
  ...allowedRoles: Array<UserRole | `${UserRole}`>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        status: 'Error',
        status_code: 401,
        message: 'No autenticado',
      });
      return;
    }

    if (!(allowedRoles as UserRole[]).includes(user.role)) {
      res.status(403).json({
        status: 'Error',
        status_code: 403,
        message: 'No tienes permisos suficientes',
      });
      return;
    }

    next();
  };
};
