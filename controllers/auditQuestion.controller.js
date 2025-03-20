const AuditQuestion = require("../models/auditQuestion.model");

// Create a new audit question
exports.createAuditQuestion = async (req, res) => {
  try {
    const auditQuestion = await AuditQuestion.create(req.body);
    res.status(201).json(auditQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all audit questions
exports.getAllAuditQuestions = async (req, res) => {
  try {
    const auditQuestions = await AuditQuestion.find();
    res.status(200).json(auditQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single audit question
exports.getAuditQuestion = async (req, res) => {
  try {
    const auditQuestion = await AuditQuestion.findById(req.params.id);
    if (!auditQuestion)
      return res.status(404).json({ message: "Audit Question not found" });
    res.status(200).json(auditQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an audit question
exports.updateAuditQuestion = async (req, res) => {
  try {
    const auditQuestion = await AuditQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!auditQuestion)
      return res.status(404).json({ message: "Audit Question not found" });
    res.status(200).json(auditQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an audit question
exports.deleteAuditQuestion = async (req, res) => {
  try {
    const auditQuestion = await AuditQuestion.findByIdAndDelete(req.params.id);
    if (!auditQuestion)
      return res.status(404).json({ message: "Audit Question not found" });
    res.status(200).json({ message: "Audit Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
