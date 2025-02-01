import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import { connect } from './services/database.service';

const startServer = async () => {
  dotenv.config();
  await connect();

  const app: Application = express();
  const port: number = 3000;
  
  app.use(errorHandler);
  app.use(bodyParser.json());

  app.use('/api', userRoutes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
