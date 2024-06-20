import ContactsCollection  from '../db/models/Contact.js';

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

const deleteContact = (contactId) => {
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId, });
  return contact;
};

const updateContact = (contactId, payload, options = {}) => {
  const rawResult = ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
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

export { getAllContacts, getContactById, createContact, deleteContact, updateContact,};
