// src/db/models/Contact.js

import { model, Schema } from 'mongoose';
import { emailRegexp, typeList } from '../../constants/contacts-constants.js';
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
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
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
