import { Router } from 'express';
import { registerRouter } from './register/register.routes.ts';
import { loginRouter } from './login/login.routes.ts';
import { AppDataSource } from '../../shared/db/index.ts'; 
import { User } from '../../shared/db/entity/User/user.ts';

export const authRouter = Router();

authRouter.use('/auth', registerRouter);
authRouter.use('/auth', loginRouter);

// // RUTAS DE SIMULACIÓN HACKATHON (La dejamos por si la necesitan)
// authRouter.patch('/auth/sync-paippa/:id', async (req, res) => {
//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    
//     if (!user) {
//       return res.status(404).json({ message: "Productor no encontrado" });
//     }

//     user.isPaippaVerified = true;
//     await userRepository.save(user);

//     return res.json({ 
//       message: "Validación exitosa con el padrón provincial", 
//       isPaippaVerified: true 
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error conectando con PAIPPA" });
//   }
// }); // <-- ACÁ FALTABA CERRAR ESTA RUTA

// // --- RUTAS DEL ACTOR PAIPPA (ADMIN) ---

// // 1. Ver lista de vendedores pendientes
// authRouter.get('/admin/pending-vendors', async (req, res) => {
//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     const pending = await userRepository.find({ 
//       where: { isPaippaVerified: false } 
//     });
//     return res.json(pending);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error al obtener vendedores pendientes" });
//   }
// });

// // 2. El PAIPPA aprueba a un vendedor
// authRouter.patch('/admin/verify/:id', async (req, res) => {
//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    
//     if (!user) {
//       return res.status(404).json({ message: "Productor no encontrado" });
//     }

//     user.isPaippaVerified = true;
//     await userRepository.save(user);

//     return res.json({ 
//       message: "Productor verificado exitosamente", 
//       isPaippaVerified: true 
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error al verificar al productor" });
//   }
// });