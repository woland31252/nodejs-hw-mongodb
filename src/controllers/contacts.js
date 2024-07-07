// src/controllers/contacts.js

import createHttpError from "http-errors";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import { fieldList } from "../constants/contacts-constants.js";
import parseFilterParams from "../utils/parseFilterParams.js";

const getContactsController = async (req, res) => {
  const { query } = req;
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, fieldList);
  const filter = { ...parseFilterParams(query), userId };

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: data,
      });
};

const getContactByIdController = async (req, res, next) => {
      const { contactId } = req.params;
      const { _id: userId } = req.user;
      const contact = await getContactById({ _id: contactId, userId });
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
  const { _id: userId } = req.user;
    const contact = await createContact({...req.body, userId});
    res.status(201).json({
        status: 201,
        message: 'Succesfully created a contact',
        data: contact,
    });
};

const patchContactController = async(req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact({_id: contactId, userId }, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));

  }
  res.json({
    status: 200,
    massage: ' Succesfuly patched contact!',
    data: result.contact,
  });
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await deleteContact({ _id: contactId, userId });
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
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
