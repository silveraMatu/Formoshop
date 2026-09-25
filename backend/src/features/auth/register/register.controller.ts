import { type Request, type Response, type NextFunction } from 'express';
import { User } from '../../../shared/db/entity/User/user.ts';
import { AppDataSource } from '../../../shared/db/index.ts';
import { encript } from '../../../shared/helpers/bcrypt.ts';
import { createToken } from '../../../shared/helpers/jwt.ts';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { name, email, password, role } = req.body;
    const hash = await encript(password);

    const newUser = userRepository.create({
      name,
      email,
      password_hash: hash,
      role,
    });
    await userRepository.save(newUser);

    const { password_hash, ...publicUser } = newUser;

    const token = createToken(newUser.id, newUser.email, newUser.role);

    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    res.status(201).json({
      status: 'Ok',
      status_code: 201,
      message: 'Usuario creado con exito',
      data: publicUser,
    });
  } catch (err) {
    next(err);
  }
};
