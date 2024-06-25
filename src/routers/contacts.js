// src/routers/contacts.js
import { Router } from "express";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../utils/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contact-validation.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));



export default router;
