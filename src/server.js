// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());

    app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res, next) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
    // next();
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        res.status(404).json({
          message: "Contact not found"
        });
        return;
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId} !`,
        data: contact,
      });
      // next();
    }
    catch (error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({ message: error.message });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
    // next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Someting not wrong',
      error: err.message,
    });
    // next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
