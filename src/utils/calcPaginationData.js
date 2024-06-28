// src/utils/calcPaginationData.js

const calcPaginationData = ({ total, page, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page !== totalPages;
  const havPrevPage = page !== 1;
  return {
    totalPages,
    hasNextPage,
    havPrevPage,
  };
};

export default calcPaginationData;
