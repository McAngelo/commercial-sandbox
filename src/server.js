import express from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import { specs, swaggerUi } from './swagger';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });


//import routes
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
// Sand box routes
import naloRoutes from './routes/nalo.routes';
import wigalRoutes from './routes/wigal.routes';
import anmRoutes from './routes/anm.routes';

import AppError from './utils/appError';
import catchAsync from './utils/catchAsync';
import globalErrorHandler from './controllers/error.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// all default routes
app.use('/api/v1', appRoutes);

// auth routes
app.use('/api/v1/auth', authRoutes);

// user routes
app.use('/api/v1/user', userRoutes);

// products routes
//app.use('/api/v1/product', productRoutes);

// Nalo routes
app.use('/api/v1/nalo', naloRoutes);

// Wigal routes
app.use('/api/v1/wigal', wigalRoutes);

// Apps and Mobile routes
app.use('/api/v1/anm', anmRoutes);

app.all(/.*/, catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND);
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});