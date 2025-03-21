const mongoose = require("mongoose");
const checkMissingFields = require("./validation.util");
const validateEnumFields = require("./enumValidation.util");
const ControlPoint = require("../models/controlPoint.model");

// Define allowed values for enum fields (shared across functions)
const enumFields = {
  securityClass: ["A", "J", "M", "none"],
  type: ["SZ", "EIR"],
  evaluationTypes: ["Document", "Test", "Interview", "Other", "none"],
  controlType: ["Assuring", "Enabling"],
  nonExcludableFromEvaluation: ["I", "N"],
};

/**
 * 🔹 Validate control point data before saving (CREATE)
 * @param {Object} data - The request body (req.body)
 * @returns {Object|null} - Returns an error object if validation fails, otherwise null */
const validateControlPointData = async (data) => {
  const requiredFields = [
    "sectionNumber",
    "controlName",
    "securityClass",
    "guidanceExplanation",
    "implementationSteps",
    "ref41_2015",
    "refISO27001",
    "refNIST800",
    "relatedSecurityMeasures",
    "type",
    "evaluationTypes",
    "controlType",
    "nonExcludableFromEvaluation",
  ];

  // Check for missing fields & invalid enum values
  const missingFields = checkMissingFields(data, requiredFields);
  const invalidFields = validateEnumFields(data, enumFields);

  if (missingFields.length > 0 || invalidFields.length > 0) {
    return {
      success: false,
      message: [
        missingFields.length > 0
          ? `Missing required fields: ${missingFields.join(", ")}`
          : null,
        invalidFields.length > 0
          ? `Invalid values detected: ${invalidFields.join("; ")}`
          : null,
      ]
        .filter(Boolean)
        .join("; "),
    };
  }

  // Check if a control point with the same sectionNumber already exists
  const existingControl = await ControlPoint.findOne({
    sectionNumber: data.sectionNumber,
  });
  if (existingControl) {
    return {
      success: false,
      message: "A control point with this sectionNumber already exists.",
    };
  }

  return null; // No validation errors
};

/**
 * 🔹 Validate control point update data before applying changes (UPDATE)
 * @param {string} id - The ObjectId of the control point being updated.
 * @param {Object} data - The request body (req.body) containing the update fields.
 * @returns {Object|null} - Returns an error object if validation fails, otherwise null */
const validateControlPointUpdate = (id, data) => {
  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid ID format.",
    };
  }

  // Prevent updating immutable fields
  if (data.sectionNumber || data._id) {
    return {
      success: false,
      message: "sectionNumber and _id cannot be updated.",
    };
  }

  // Check for invalid enum values
  const invalidFields = validateEnumFields(data, enumFields);
  if (invalidFields.length > 0) {
    return {
      success: false,
      message: `Invalid values detected: ${invalidFields.join("; ")}`,
    };
  }

  return null; // No validation errors
};

// Export both functions
module.exports = {
  validateControlPointData,
  validateControlPointUpdate,
};
