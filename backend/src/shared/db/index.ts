import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entity/User/user.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [User],
});

export const connectDB = async () => {
  await AppDataSource.initialize();
  console.log('Conexion a la base de datos establecida');
};