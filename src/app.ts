import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
// http://localhost:5173,
// https://shoemanagementsystem.netlify.app

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// application routes

// app.use('/api', UserRoutes);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Shoe Management System');
});

app.use(globalErrorHandler);
export default app;
// console.log(process.cwd());
