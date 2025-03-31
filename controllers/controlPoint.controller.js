const mongoose = require("mongoose");
const ControlPoint = require("../models/controlPoint.model");
const {
  validateControlPointData,
  validateControlPointUpdate,
} = require("../src/utils/controlPointValidation.util");

const {
  getSortingAndPagination,
} = require("../src/utils/sortingAndPagination");
const enumFields = require("../src/utils/enumFields.controlPoint");

// Create a new control point
exports.createControlPoint = async (req, res) => {
  try {
    // Validate input data
    const validationError = await validateControlPointData(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    // Create a new control point
    let controlPoint = await ControlPoint.create(req.body);

    // Fetch the created control point with populated csfDocuments
    controlPoint = await ControlPoint.findById(controlPoint._id).populate(
      "csfDocuments"
    );

    return res.status(201).json({ success: true, data: controlPoint });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all control points (with pagination & sorting)
exports.getAllControlPoints = async (req, res) => {
  try {
    const { sort, skip, limit, currentPage, pageSize } =
      getSortingAndPagination(req.query);

    // Get filter parameters from query
    const { controlName, securityClass } = req.query;

    // Build the query object
    let query = {};

    // Add controlName filter if provided (partial match)
    if (controlName) {
      query.controlName = { $regex: new RegExp(controlName, "i") }; // Case-insensitive search
    }

    // Add securityClass filter if provided (exact match)
    if (securityClass) {
      // Validate against allowed enum values
      const validSecurityClasses = enumFields.securityClass;
      if (!validSecurityClasses.includes(securityClass)) {
        return res.status(400).json({
          success: false,
          error: `Invalid securityClass. Must be one of: 
          ${validSecurityClasses.join(", ")}`,
        });
      }
      query.securityClass = securityClass;
    }

    // Fetch audit questions with pagination, sorting, and filtering
    const [controlPoints, count] = await Promise.all([
      ControlPoint.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("csfDocuments")
        .exec(),
      ControlPoint.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      total: count,
      page: currentPage,
      pages: Math.ceil(count / pageSize),
      data: controlPoints,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single control point by ID
exports.getControlPoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const controlPoint = await ControlPoint.findById(id);
    if (!controlPoint) {
      return res
        .status(404)
        .json({ success: false, message: "Control Point not found." });
    }

    res.status(200).json({ success: true, data: controlPoint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a control point
exports.updateControlPoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate update data
    const validationError = validateControlPointUpdate(id, req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    // Perform the update
    let controlPoint = await ControlPoint.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!controlPoint) {
      return res.status(404).json({
        success: false,
        message: "Control Point not found.",
      });
    }

    // Fetch the created control point with populated csfDocuments
    controlPoint = await ControlPoint.findById(controlPoint._id).populate(
      "csfDocuments"
    );

    return res.status(200).json({ success: true, data: controlPoint });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a control point
exports.deleteControlPoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const controlPoint = await ControlPoint.findByIdAndDelete(id);
    if (!controlPoint) {
      return res
        .status(404)
        .json({ success: false, message: "Control Point not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Control Point deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
