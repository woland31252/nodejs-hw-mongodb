// src/validation/userSchemas.js

import Joi from 'joi';

import { emailRegexp } from '../constants/contacts-constants.js';

const userLogupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export { userLogupSchema, userLoginSchema, requestResetEmailSchema };
