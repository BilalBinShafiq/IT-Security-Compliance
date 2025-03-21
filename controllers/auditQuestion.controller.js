const mongoose = require("mongoose");
const AuditQuestion = require("../models/auditQuestion.model");
const ControlPoint = require("../models/controlPoint.model");

/**
 * 🔹 Create a new audit question.
 * - Validates the referenced control point.
 * - Automatically generates `auditQuestionIdentifier` if missing.
 * - Handles errors for better debugging.
 */
exports.createAuditQuestion = async (req, res) => {
  try {
    const { controlRef, auditQuestionIdentifier } = req.body;

    // 🔹 Validate controlRef (Ensure the control point exists)
    if (!mongoose.Types.ObjectId.isValid(controlRef)) {
      return res.status(400).json({ error: "Invalid controlRef format." });
    }

    const controlPointExists = await ControlPoint.findById(controlRef);
    if (!controlPointExists) {
      return res.status(400).json({
        error:
          "Invalid controlRef. The specified control point does not exist.",
      });
    }

    // 🔹 Auto-generate `auditQuestionIdentifier` if missing
    if (!auditQuestionIdentifier) {
      const count = await AuditQuestion.countDocuments();
      req.body.auditQuestionIdentifier = `K01.${(count + 1)
        .toString()
        .padStart(3, "0")}_P[1]`;
    }

    // 🔹 Create the audit question
    const auditQuestion = await AuditQuestion.create(req.body);
    res.status(201).json(auditQuestion);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error:
          "Duplicate auditQuestionIdentifier. The identifier must be unique.",
      });
    }
    res.status(400).json({ error: error.message });
  }
};

/**
 * 🔹 Get all audit questions.
 * - Uses `.lean()` for better performance.
 */
exports.getAllAuditQuestions = async (req, res) => {
  try {
    const auditQuestions = await AuditQuestion.find().lean();
    res.status(200).json(auditQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔹 Get a single audit question by ID.
 * - Validates MongoDB ObjectId format before querying.
 */
exports.getAuditQuestion = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Invalid auditQuestion ID format." });
    }

    const auditQuestion = await AuditQuestion.findById(req.params.id).lean();
    if (!auditQuestion) {
      return res.status(404).json({ message: "Audit Question not found" });
    }
    res.status(200).json(auditQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔹 Update an audit question.
 * - Ensures the audit question exists before updating.
 * - Uses `{ runValidators: true }` to enforce schema validation.
 */
exports.updateAuditQuestion = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Invalid auditQuestion ID format." });
    }

    const auditQuestion = await AuditQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!auditQuestion) {
      return res.status(404).json({ message: "Audit Question not found" });
    }
    res.status(200).json(auditQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * 🔹 Delete an audit question.
 * - Validates the MongoDB ObjectId format before deleting.
 */
exports.deleteAuditQuestion = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Invalid auditQuestion ID format." });
    }

    const auditQuestion = await AuditQuestion.findByIdAndDelete(req.params.id);
    if (!auditQuestion) {
      return res.status(404).json({ message: "Audit Question not found" });
    }
    res.status(200).json({ message: "Audit Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
