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


const parseFilterParams = (type, favourite) => {
  const parsedType = parseType(type);
  const parsedFavourite = parseBoolean(favourite);
  return {
    type: parsedType,
    favourite: parsedFavourite,
  };
};

export default parseFilterParams;
