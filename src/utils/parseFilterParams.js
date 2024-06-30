// src/utils/parseFilterParams.js

import { typeList } from "../constants/contacts-constants.js";

const parseBoolean = (value) => {
  if (typeof value !== 'string') return ;
  if (!['true', 'false'].includes(value)) return;
  const parsedValue = Boolean(value);
  if (parsedValue) {
    return value;
  }
};

const parseType = (value) => {
  const type = typeof value;
  if (typeof value !== 'string') return console.log('type :', type);
  if (typeList.includes(value)) {
    return value;
  }
  return null;
};


const parseFilterParams = ({ type, isFavourite }) => {
  const parsedType = parseType(type);
  const parsedFavourite = parseBoolean(isFavourite);
  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};

export default parseFilterParams;
