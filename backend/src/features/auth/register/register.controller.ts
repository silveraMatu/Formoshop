import { type Request, type Response, type NextFunction } from 'express';
import { User } from '../../../shared/db/entity/User/user.ts';
import { AppDataSource } from '../../../shared/db/index.ts';
import { encript } from '../../../shared/helpers/bcrypt.ts';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { name, email, password } = req.body;
    const hash = await encript(password);

    const newUser = userRepository.create({ name, email, password_hash: hash });
    await userRepository.save(newUser);

    const { password_hash, ...publicUser } = newUser;

    res.status(201).json({
      statusCode: 200,
      message: 'Usuario creado con exito',
      data: publicUser,
    });
  } catch (err) {
    next(err);
  }
};
