import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './shared/db/index.ts';
import { logger } from './utilities/logger.ts';
import { pinoHttp } from 'pino-http';
import { authRouter } from './features/auth/auth.routes.ts';
import { errorHandler } from './shared/Middlewares/errorHandler.ts';
import cookieParser from 'cookie-parser';
import cors from "cors"
import getProductsRouter from './features/product/get-products/getProducts.routes.ts'
import { get } from 'http';
import getProductByIdRouter from './features/product/get-product-by-id/getProductById.routes.ts'

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(pinoHttp({ logger }));
app.use('/api', authRouter);
app.use('/api', getProductsRouter)
app.use('/api/products', getProductByIdRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'Ok' });
});

app.use(errorHandler)

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Escuchando en localhost:${PORT}`);
});
