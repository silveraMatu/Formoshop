import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entity/User/user.ts';
import { Product } from './entity/Product/product.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: true,
  logging: false,
  entities: [User, Product],
});

export const connectDB = async () => {
  await AppDataSource.initialize();
  console.log('Conexion a la base de datos establecida');
};
