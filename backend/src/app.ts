import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './shared/db/index.ts';
import { logger } from './utilities/logger.ts';
import { pinoHttp } from 'pino-http';
import { authRouter } from './features/auth/auth.routes.ts';
import { errorHandler } from './shared/Middlewares/errorHandler.ts';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { productRouter } from './features/product/products.route.ts';

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(pinoHttp({ logger }));

app.use('/api', authRouter);
app.use('/api/products', productRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'Ok' });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Escuchando en localhost:${PORT}`);
});
