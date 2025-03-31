// enumController.js
const enumFieldsAuditQuestion = require("../src/utils/enumFields.auditQuestion");

// Get all enum values
exports.getAllEnumValues = async (req, res) => {
  try {
    // Return all enum fields directly
    return res.status(200).json({
      success: true,
      data: enumFieldsAuditQuestion,
      message: "Enum values retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error retrieving enum values",
    });
  }
};

// Alternative: If you want to get a specific enum field only
exports.getSpecificEnumValues = async (req, res) => {
  try {
    const { fieldName } = req.params; // Expecting fieldName in URL params

    if (!enumFieldsAuditQuestion[fieldName]) {
      return res.status(404).json({
        success: false,
        message: `Enum field '${fieldName}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: { [fieldName]: enumFieldsAuditQuestion[fieldName] },
      message: `Enum values for ${fieldName} retrieved successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error retrieving enum values",
    });
  }
};
