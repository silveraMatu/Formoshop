import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET!;

export const createToken = (userId: number, email: string): string => {
  const payload = {
    id: userId,
    email,
  };

  return jwt.sign(payload, SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
};
