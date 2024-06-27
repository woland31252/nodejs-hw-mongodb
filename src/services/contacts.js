import ContactsCollection from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

const getAllContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const contacts = await ContactsCollection.find().skip(skip).limit(perPage);
  const totalContacts = await ContactsCollection.find().countDocuments();
  const { totalPages, nasNextPage, havPrevPage } = calcPaginationData({ total: totalContacts, page, perPage });
  return {
    contacts,
    totalContacts,
    page,
    perPage,
    totalPages,
    nasNextPage,
    havPrevPage,
  };
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
