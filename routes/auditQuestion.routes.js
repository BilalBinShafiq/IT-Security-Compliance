console.log("3️⃣ Loading auditQuestion.routes.js...");

const express = require("express");
const router = express.Router();
const auditQuestionController = require("../controllers/auditQuestion.controller");
const validateObjectId = require("../src/utils/validateObjectId");

// Create an audit question
router.post("/", (req, res) => {
  console.log("📌 Handling POST /api/audit-questions");
  auditQuestionController.createAuditQuestion(req, res);
});

// Get all audit questions
router.get("/", (req, res) => {
  console.log("📌 Handling GET /api/audit-questions");
  auditQuestionController.getAllAuditQuestions(req, res);
});

// Get a single audit question by ID
router.get("/:id", validateObjectId("Audit Question ID"), (req, res) => {
  console.log(`📌 Handling GET /api/audit-questions/${req.params.id}`);
  auditQuestionController.getAuditQuestion(req, res);
});

// Update an audit question
router.put("/:id", validateObjectId("Audit Question ID"), (req, res) => {
  console.log(`📌 Handling PUT /api/audit-questions/${req.params.id}`);
  auditQuestionController.updateAuditQuestion(req, res);
});

// Delete an audit question
router.delete("/:id", validateObjectId("Audit Question ID"), (req, res) => {
  console.log(`📌 Handling DELETE /api/audit-questions/${req.params.id}`);
  auditQuestionController.deleteAuditQuestion(req, res);
});

module.exports = router;
