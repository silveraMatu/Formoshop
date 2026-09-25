import jwt from 'jsonwebtoken';
import type { UserRole } from '../db/entity/User/user.ts';

const SECRET = process.env.SECRET!;

export const createToken = (
  userId: number,
  email: string,
  role: UserRole,
): string => {
  const payload = {
    id: userId,
    email,
    role,
  };

  const token = jwt.sign(payload, SECRET, {
    expiresIn: '1h',
  });

  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
};
