/**
 * 🔹 Utility function to check for missing required fields in an object.
 * @param {Object} data - The input object (e.g., req.body).
 * @param {Array} requiredFields - List of required field names.
 * @returns {Array} - Returns an array of missing field names */
const checkMissingFields = (data, requiredFields) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!data[field]) {
      console.log(`⚠️ Missing Field: ${field}`); // Log each missing field
      missingFields.push(field);
    }
  });

  return missingFields;
};

module.exports = checkMissingFields;
