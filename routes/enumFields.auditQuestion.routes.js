const express = require("express");
const router = express.Router();
const enumFieldsControlPointController = require("../controllers/enumFields.auditQuestion.controller");

// Get all enum values
router.get("/", (req, res) => {
  console.log("📌 Handling GET /api/enum-fields-audit-question");
  enumFieldsControlPointController.getAllEnumValues(req, res);
});

// Get specific enum field values
router.get("/:fieldName", (req, res) => {
  console.log("📌 Handling GET /api/enum-fields-audit-question/:fieldName");
  enumFieldsControlPointController.getSpecificEnumValues(req, res);
});

module.exports = router;
