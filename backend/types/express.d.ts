import { JwtPayload } from 'jsonwebtoken';

export interface AuthUserPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}