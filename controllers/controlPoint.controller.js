const mongoose = require("mongoose");
const ControlPoint = require("../models/controlPoint.model");

/**
 * 🔹 Create a new control point
 */
exports.createControlPoint = async (req, res) => {
  try {
    const {
      sectionNumber,
      controlName,
      securityClass,
      type,
      controlType,
      nonExcludableFromEvaluation,
    } = req.body;

    // Validate all required fields
    if (
      !sectionNumber ||
      !controlName ||
      !securityClass ||
      !type ||
      !controlType ||
      !nonExcludableFromEvaluation
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: sectionNumber, controlName, securityClass, type, controlType, nonExcludableFromEvaluation.",
      });
    }

    // Check if control point already exists with the same sectionNumber
    const existingControl = await ControlPoint.findOne({ sectionNumber });
    if (existingControl) {
      return res.status(409).json({
        success: false,
        message: "A control point with this sectionNumber already exists.",
      });
    }

    // Create a new control point
    const controlPoint = await ControlPoint.create(req.body);
    res.status(201).json({ success: true, data: controlPoint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * 🔹 Get all control points (with pagination & sorting)
 */
exports.getAllControlPoints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page = 1
    const limit = parseInt(req.query.limit) || 10; // Default limit = 10

    const controlPoints = await ControlPoint.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await ControlPoint.countDocuments();

    res.status(200).json({
      success: true,
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: controlPoints,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * 🔹 Get a single control point by ID
 */
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

/**
 * 🔹 Update a control point
 */
exports.updateControlPoint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    // Prevent updating _id or sectionNumber
    if (req.body.sectionNumber || req.body._id) {
      return res.status(400).json({
        success: false,
        message: "sectionNumber and _id cannot be updated.",
      });
    }

    const controlPoint = await ControlPoint.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!controlPoint) {
      return res
        .status(404)
        .json({ success: false, message: "Control Point not found." });
    }

    res.status(200).json({ success: true, data: controlPoint });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * 🔹 Delete a control point
 */
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
