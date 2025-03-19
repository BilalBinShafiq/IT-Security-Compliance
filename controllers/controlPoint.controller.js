const ControlPoint = require("../models/controlPoint.model");

// Create a new control point
exports.createControlPoint = async (req, res) => {
  try {
    const controlPoint = await ControlPoint.create(req.body);
    res.status(201).json(controlPoint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all control points
exports.getAllControlPoints = async (req, res) => {
  try {
    const controlPoints = await ControlPoint.find();
    res.status(200).json(controlPoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single control point
exports.getControlPoint = async (req, res) => {
  try {
    const controlPoint = await ControlPoint.findById(req.params.id);
    if (!controlPoint)
      return res.status(404).json({ message: "Control Point not found" });
    res.status(200).json(controlPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a control point
exports.updateControlPoint = async (req, res) => {
  try {
    const controlPoint = await ControlPoint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!controlPoint)
      return res.status(404).json({ message: "Control Point not found" });
    res.status(200).json(controlPoint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a control point
exports.deleteControlPoint = async (req, res) => {
  try {
    const controlPoint = await ControlPoint.findByIdAndDelete(req.params.id);
    if (!controlPoint)
      return res.status(404).json({ message: "Control Point not found" });
    res.status(200).json({ message: "Control Point deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
