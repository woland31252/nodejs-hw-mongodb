// src/controllers/contacts.js

import { getAllContacts, getContactById } from "../services/contacts.js";

const getContactsController = async (req, res, next) => {
    try {
      const contacts = await getAllContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
        next(error);
    }
};

const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            next(new Error('Contact not found'));
            return;
            // res.status(404).json({
            //     message: 'Contact not found',
            // });
            // return;
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId} !`,
            data: contact,
        });
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')) {
            error.status = 404;
        }
        const { status = 500 } = error;
        res.status(status).json({ message: error.message });
    }
};

export {getContactsController, getContactByIdController};
