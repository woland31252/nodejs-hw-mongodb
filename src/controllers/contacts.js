// src/controllers/contacts.js

import createHttpError from "http-errors";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

const getContactsController = async (req, res) => {

      const contacts = await getAllContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
};

const getContactByIdController = async (req, res, next) => {
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
};

const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Succesfully created a contact',
        data: contact,
    });
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    next(new createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    massage: ' Succesfuly patched contact!',
    data: result.contact,
  });
};

const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
        next(new createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};





export {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
};
