import ContactsCollection  from '../db/models/Contact.js';

const getAllContacts = () => {
    const contacts = ContactsCollection.find();
    return contacts;
};

const getContactById = (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};

export { getAllContacts, getContactById };
