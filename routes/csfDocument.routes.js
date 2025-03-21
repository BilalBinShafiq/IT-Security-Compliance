console.log("3️⃣ Loading csfDocument.routes.js...");

const express = require("express");
const router = express.Router();
const csfDocumentController = require("../controllers/csfDocument.controller");
const validateObjectId = require("../src/utils/validateObjectId");

// Create a CSF document
router.post("/", (req, res) => {
  console.log("📌 Handling POST /api/csf-documents");
  csfDocumentController.createCSFDocument(req, res);
});

// Get all CSF documents
router.get("/", (req, res) => {
  console.log("📌 Handling GET /api/csf-documents");
  csfDocumentController.getAllCSFDocuments(req, res);
});

// Get a single CSF document by ID
router.get("/:id", validateObjectId("CSF Document ID"), (req, res) => {
  console.log(`📌 Handling GET /api/csf-documents/${req.params.id}`);
  csfDocumentController.getCSFDocument(req, res);
});

// Update a CSF document
router.put("/:id", validateObjectId("CSF Document ID"), (req, res) => {
  console.log(`📌 Handling PUT /api/csf-documents/${req.params.id}`);
  csfDocumentController.updateCSFDocument(req, res);
});

// Delete a CSF document
router.delete("/:id", validateObjectId("CSF Document ID"), (req, res) => {
  console.log(`📌 Handling DELETE /api/csf-documents/${req.params.id}`);
  csfDocumentController.deleteCSFDocument(req, res);
});

module.exports = router;
