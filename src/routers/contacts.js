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
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));



export default router;
