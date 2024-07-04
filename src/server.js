// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
// import contactsRouter from '../src/routers/contacts.js';
// import authRouter from "../src/routers/auth.js";
import router from '../src/routers/index.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );


    app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(router);

  // app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


