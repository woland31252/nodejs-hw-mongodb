// src/validation/contact-validation.js

import Joi from "joi";
import { emailRegexp, typeList } from "../constants/contacts-constants.js";

const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(2).max(20),
  email: Joi.string().pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});

export { createContactSchema, updateContactSchema };
