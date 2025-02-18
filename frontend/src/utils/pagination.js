// utils/pagination.js
export const usePagination = (items, itemsPerPage) => {
  const totalPages = Math.ceil(items?.length / itemsPerPage);

  const paginate = (array, pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return array?.slice(startIndex, startIndex + itemsPerPage);
  };

  return { totalPages, paginate };
};
