/**
 * 🔹 Utility function to validate enum fields in an object.
 * @param {Object} data - The input object (e.g., req.body).
 * @param {Object} enumFields - An object containing allowed enum values for each field.
 * @returns {Array} - Returns an array of invalid field messages including allowed values */
const validateEnumFields = (data, enumFields) => {
  const invalidFields = [];

  // Loop through each enum field to check its validity
  Object.keys(enumFields).forEach((field) => {
    if (data[field]) {
      const allowedValues = enumFields[field];

      // If the field is an array (e.g., evaluationTypes), check each value
      if (Array.isArray(data[field])) {
        const invalidValues = data[field].filter(
          (value) => !allowedValues.includes(value)
        );
        if (invalidValues.length > 0) {
          invalidFields.push(
            `${field}: Invalid values -> [${invalidValues.join(
              ", "
            )}]. Allowed values: [${allowedValues.join(", ")}]`
          );
        }
      }
      // If the field is a string, check if the value is valid
      else if (!allowedValues.includes(data[field])) {
        invalidFields.push(
          `${field}: Invalid value -> "${
            data[field]
          }". Allowed values: [${allowedValues.join(", ")}]`
        );
      }
    }
  });

  return invalidFields;
};

module.exports = validateEnumFields;
