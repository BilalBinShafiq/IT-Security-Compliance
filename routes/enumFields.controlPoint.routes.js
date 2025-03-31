const express = require("express");
const router = express.Router();
const enumFieldsControlPointController = require("../controllers/enumFields.controlPoint.controller");

// Get all enum values
router.get("/", (req, res) => {
  console.log("📌 Handling GET /api/enum-fields-control-point");
  enumFieldsControlPointController.getAllEnumValues(req, res);
});

// Get specific enum field values
router.get("/:fieldName", (req, res) => {
  console.log("📌 Handling GET /api/enum-fields-control-point/:fieldName");
  enumFieldsControlPointController.getSpecificEnumValues(req, res);
});

module.exports = router;
