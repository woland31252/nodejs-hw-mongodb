// src/db/models/Contact.js

import { model, Schema } from 'mongoose';
import { emailRegexp, tipeList } from '../../constants/contacts-constants.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      trim: true,
      lowercase: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: tipeList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', mongooseSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', mongooseSaveError);

const ContactsCollection = model('contact', contactsSchema);
export default ContactsCollection;
