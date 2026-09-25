import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import type { AuthUserPayload } from '../../../types/express.d.ts';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({
      status: 'Error',
      status_code: 401,
      message: 'No autenticado',
    });
    return;
  }

  try {

    const secret = process.env.SECRET!
    const decoded = jwt.verify(token, secret) as AuthUserPayload;

    req.user = decoded;
    next();

  } catch (error) {
    res.status(403).json({
      status: 'Error',
      status_code: 403,
      message: 'Sesión expirada o token no válido',
    });
  }
};
