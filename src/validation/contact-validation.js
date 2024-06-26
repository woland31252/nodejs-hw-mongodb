import Joi from "joi";
import { emailRegexp, tipeList } from "../constants/contacts-constants.js";

const createContactSchema = Joi.object({
    name: Joi.string().min(5).max(18).required(),
<<<<<<< Updated upstream
    phoneNumber: Joi.string().min(10).max(14).required(),
=======
    phoneNumber: Joi.string().min(10).max(12).required(),
>>>>>>> Stashed changes
    email: Joi.string().pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...tipeList).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(5).max(18),
  phoneNumber: Joi.string().min(10).max(14),
  email: Joi.string().pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...tipeList),
});

export { createContactSchema, updateContactSchema };
