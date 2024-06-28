import ContactsCollection from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = (page - 1) * perPage;
  const data = await ContactsCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
  const totalItems = await ContactsCollection.find().countDocuments();
  const { totalPages, hasNextPage, havPrevPage } = calcPaginationData({ total: totalItems, page, perPage });
  return {
    data,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
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
