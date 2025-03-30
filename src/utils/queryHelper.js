// Utility function to handle sorting and pagination
exports.getSortingAndPagination = (query) => {
  // Destructure with defaults
  const { sort = "desc", page = "1", limit = "10" } = query;

  // Validate sorting
  if (!["asc", "desc"].includes(sort)) {
    throw new Error("Invalid sort value. Use 'asc' or 'desc'.");
  }

  // Validate page and limit
  const currentPage = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (isNaN(currentPage) || currentPage <= 0) {
    throw new Error("Invalid 'page' value. It must be a positive number.");
  }

  if (isNaN(pageSize) || pageSize <= 0) {
    throw new Error("Invalid 'limit' value. It must be a positive number.");
  }

  // Return sorting and pagination options
  return {
    sort: { createdAt: sort === "asc" ? 1 : -1 },
    skip: (currentPage - 1) * pageSize,
    limit: pageSize,
    currentPage,
    pageSize,
  };
};
