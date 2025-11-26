import express from 'express';
import cors from 'cors';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';
import { specs, swaggerUi } from './swagger';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });



import { 
  //import routes
  appRoutes, 
  authRoutes,
  userRoutes,
  businessRoutes,
  // Sand box routes
  naloRoutes,
  wigalRoutes,
  anmRoutes,
  expressPayRoutes,
  arkeselRoutes,
  flutterwaveRoutes,
  korapayRoutes,
  mnotifyRoutes,
  paystackRoutes
} from './routes';

import AppError from './utils/appError';
import catchAsync from './utils/catchAsync';
import globalErrorHandler from './controllers/error.controller';

const app = express();
console.log('Environment:', process.env.APP_PORT);
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  swaggerOptions: {
    tagsSorter: "alpha",          // or "reverse-alpha"
    operationsSorter: "alpha",    // or method, or custom
  }
}));

// all default routes
app.use('/api/v1', appRoutes);

// products routes
app.use('/api/v1/business', businessRoutes);

// user routes
app.use('/api/v1/user', userRoutes);

// auth routes
app.use('/api/v1/auth', authRoutes);

// Nalo routes
app.use('/api/v1/nalo', naloRoutes);

// Wigal routes
app.use('/api/v1/wigal', wigalRoutes);

// Apps and Mobile routes
app.use('/api/v1/anm', anmRoutes);

// Express Pay Sandbox routes
app.use('/api/v1/express-pay', expressPayRoutes);

// Arkesel Sandbox routes
app.use('/api/v1/arkesel', arkeselRoutes);

// Flutterwave Sandbox routes
app.use('/api/v1/flutterwave', flutterwaveRoutes);

// Korapay Sandbox routes
app.use('/api/v1/korapay', korapayRoutes);

// MNotify Sandbox routes
app.use('/api/v1/mnotify', mnotifyRoutes);

// Paystack Sandbox routes
app.use('/api/v1/paystack', paystackRoutes);


app.all(/.*/, catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND);
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});