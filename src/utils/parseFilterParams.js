// src/utils/parseFilterParams.js

import { typeList } from "../constants/contacts-constants.js";

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;
  const parsedValue = Boolean(value);
  return parsedValue;
};

const parseType = (value) => {
  if (typeof value !== 'string') return;
  typeList.includes(value) ? value : null;
};


const parseFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = parseType(contactType);
  const parsedFavourite = parseBoolean(isFavourite);
  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};

export default parseFilterParams;
