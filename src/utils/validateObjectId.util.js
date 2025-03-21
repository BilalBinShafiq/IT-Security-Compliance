const mongoose = require("mongoose");

/**
 * 🔹 Validates if a given ID is a valid MongoDB ObjectId.
 * - If invalid, sends a 400 response with an error message.
 * - If valid, proceeds to the next middleware/controller.
 * @param {string} paramName - The name of the parameter (e.g., "CSF Document ID") */
const validateObjectId =
  (paramName = "Resource ID") =>
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: `Invalid ${paramName}` });
    }
    next();
  };

module.exports = validateObjectId;
