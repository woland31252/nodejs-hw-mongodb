import ContactsCollection from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter = {} }) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }


  const totalItems = await ContactsCollection.find().merge(contactsQuery).countDocuments();
  const data = await contactsQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder }).exec();


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

const getContactById = (filter) => {
  const contact = ContactsCollection.findOne(filter);

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
  console.log("contact_ID",contactId._id);
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId._id } );

  return contact;
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
