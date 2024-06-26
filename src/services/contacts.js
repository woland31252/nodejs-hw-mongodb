import ContactsCollection from '../db/models/Contact.js';

const getAllContacts = () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

const getContactById = (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};

const createContact = (payload) => {
  const contact = ContactsCollection.create(payload);
  return contact;
};

const updateContact = async (filter, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    filter,
    payload,
    {
      // new: true,
      // runValidators: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

const deleteContact = (contactId) => {
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
