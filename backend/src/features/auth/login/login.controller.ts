import type { Request, Response, NextFunction, Application } from 'express';
import type { LoginUserDTO } from './login.schema.ts';
import { comparePassword } from '../../../shared/helpers/bcrypt.ts';
import { AppDataSource } from '../../../shared/db/index.ts';
import { User } from '../../../shared/db/entity/User/user.ts';
import { NotFoundError, UnauthorizedError } from '../../../shared/customErrors/custom.ts';
import { createToken } from '../../../shared/helpers/jwt.ts';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const { email, password }: LoginUserDTO = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundError('Email o contraseña incorrectos');
    }

    const passwordOk = await comparePassword(password, user.password_hash);
    if(!passwordOk){
        throw new UnauthorizedError("Email o contraseña incorrectos")
    }

    const token = createToken(user.id, user.email);

    const { password_hash, ...publicUser } = user;

    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    res.status(200).json({
      status: 'Ok',
      status_code: 200,
      message: `Bienvenido ${user.name}!`,
      data: publicUser,
    });
  } catch (err) {
    next(err);
  }
};
