const mongoose = require("mongoose");
const ControlPoint = require("../models/controlPoint.model");

// Create a new control point
exports.createControlPoint = async (req, res) => {
  try {
    // Validate input data
    const validationError = await validateControlPointData(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    // Create a new control point
    const controlPoint = await ControlPoint.create(req.body);
    return res.status(201).json({ success: true, data: controlPoint });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all control points (with pagination & sorting)
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
    const controlPoint = await ControlPoint.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!controlPoint) {
      return res.status(404).json({
        success: false,
        message: "Control Point not found.",
      });
    }

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
