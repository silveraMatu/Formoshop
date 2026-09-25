import { JwtPayload } from 'jsonwebtoken';
import type { UserRole } from '../src/shared/db/entity/User/user.ts';

export interface AuthUserPayload extends JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}
