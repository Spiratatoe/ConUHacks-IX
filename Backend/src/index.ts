import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import WebSocket from 'ws';

import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import { connect } from './services/database.service';
import { handleAiPrompt } from './services/handleAiPrompt.service';
import { chatPrompt } from './services/AiPromptRestrictions';

const HTTP_PORT = 3000;
const WS_PORT = 3002;

const startServer = async () => {
  dotenv.config();
  await connect();

  await webServer();
  await webSocket();
};

const webServer = async () => {
  const app: Application = express();

  app.use(cors());
  app.use(errorHandler);
  app.use(bodyParser.json());

  app.use('/api', userRoutes);

  app.listen(HTTP_PORT, () => {
    console.log(`Server is running on http://localhost:${HTTP_PORT}`);
  });
}

const webSocket = async () => {
  const wss = new WebSocket.Server({ port: WS_PORT });

  wss.on('connection', (ws: WebSocket) => {

    const chatHistory: any[] = [{ role: 'system', content: chatPrompt }];

    ws.on('message', (data: WebSocket.RawData) => {
      const message = data.toString();
      handleAiPrompt(ws, message, chatHistory);
    });

    ws.on('close', () => {
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);
}

startServer();
