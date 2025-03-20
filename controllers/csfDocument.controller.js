const CSFDocument = require("../models/csfDocument.model");

// Create a new CSF document
exports.createCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.create(req.body);
    res.status(201).json(csfDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all CSF documents
exports.getAllCSFDocuments = async (req, res) => {
  try {
    const csfDocuments = await CSFDocument.find();
    res.status(200).json(csfDocuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single CSF document
exports.getCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findById(req.params.id);
    if (!csfDocument)
      return res.status(404).json({ message: "CSF Document not found" });
    res.status(200).json(csfDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a CSF document
exports.updateCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!csfDocument)
      return res.status(404).json({ message: "CSF Document not found" });
    res.status(200).json(csfDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a CSF document
exports.deleteCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findByIdAndDelete(req.params.id);
    if (!csfDocument)
      return res.status(404).json({ message: "CSF Document not found" });
    res.status(200).json({ message: "CSF Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
