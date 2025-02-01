import express, { Application, Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';


const app: Application = express();
const port: number = 3000;

app.use('/api', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
