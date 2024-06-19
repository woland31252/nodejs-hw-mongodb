// src/controllers/contacts.js

import createHttpError from "http-errors";
import { getAllContacts, getContactById } from "../services/contacts.js";

const getContactsController = async (req, res) => {

      const contacts = await getAllContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
};

const getContactByIdController = async (req, res, next) => {
    // try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            next(createHttpError(404, 'Contact not found'));
            return;
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId} !`,
            data: contact,
        });
    // } catch (error) {
    //     if (error.message.includes('Cast to ObjectId failed')) {
    //         error.status = 404;
    //     }
    //     const { status = 500 } = error;
    //     res.status(status).json({ message: error.message });
    // }
};

export {getContactsController, getContactByIdController};
