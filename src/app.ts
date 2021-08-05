import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';

import mongoConnect from './configs/db.config';
import { handleError, handle404 } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(helmet());
app.use(json());
app.use(morgan('tiny'));
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(mongoSanitize());

// API Routes Setup

// Error Handling
app.use(handle404);

mongoConnect(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => console.log(`Servidor ativo na porta ${process.env.PORT}`));