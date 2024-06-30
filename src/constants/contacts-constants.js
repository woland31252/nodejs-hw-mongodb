// src/constants/contacts-constants.js

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const typeList = ['work', 'home', 'personal'];
const fieldList = [
    "name",
    "phoneNumber",
    "email",
    "isFavourite",
    "contactType",
    "createdAt",
    "updatedAt",
];

export { emailRegexp, typeList, fieldList };
