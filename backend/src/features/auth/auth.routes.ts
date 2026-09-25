import { Router } from 'express';
import { registerRouter } from './register/register.routes.ts';
import { loginRouter } from './login/login.routes.ts';
import { AppDataSource } from '../../shared/db/index.ts'; 
import { User } from '../../shared/db/entity/User/user.ts';
import { authenticateToken } from '../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../shared/Middlewares/role.middleware.ts';

export const authRouter = Router();

authRouter.use('/auth', registerRouter);
authRouter.use('/auth', loginRouter);

authRouter.patch('/auth/sync-paippa/:id', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    
    if (!user) {
      return res.status(404).json({ message: "Productor no encontrado" });
    }

    user.isPaippaVerified = true;
    await userRepository.save(user);

    return res.json({ 
      message: "Validación exitosa con el padrón provincial", 
      isPaippaVerified: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error conectando con PAIPPA" });
  }
});
authRouter.get(
  '/admin/pending-vendors',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const pending = await userRepository.find({ 
        where: { isPaippaVerified: false } 
      });
      return res.json(pending);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener vendedores pendientes" });
    }
  },
);

authRouter.patch(
  '/admin/verify/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: Number(req.params.id) });
      
      if (!user) {
        return res.status(404).json({ message: "Productor no encontrado" });
      }

      user.isPaippaVerified = true;
      await userRepository.save(user);

      return res.json({ 
        message: "Productor verificado exitosamente", 
        isPaippaVerified: true 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al verificar al productor" });
    }
  },
);
