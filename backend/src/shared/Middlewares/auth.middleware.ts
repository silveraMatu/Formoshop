import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../helpers/jwt.ts';
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
    const decoded = verifyToken(token) as AuthUserPayload;

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