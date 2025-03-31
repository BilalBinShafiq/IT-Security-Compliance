console.log("2️⃣ Loading app.js...");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controlPointRoutes = require("../routes/controlPoint.routes");
const enumFieldsControlPointRoutes = require("../routes/enumFields.controlPoint.routes");
const csfDocumentRoutes = require("../routes/csfDocument.routes");
const auditQuestionRoutes = require("../routes/auditQuestion.routes");
const enumFieldsAuditQuestionRoutes = require("../routes/enumFields.auditQuestion.routes");

const app = express();

// Middleware
console.log("4️⃣ Setting up middleware...");
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json({ limit: "10mb" })); // Parse JSON with size limit
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
console.log("5️⃣ Loading routes...");
app.use("/api/control-points", controlPointRoutes);
app.use("/api/control-point-enum-fields", enumFieldsControlPointRoutes);
app.use("/api/csf-documents", csfDocumentRoutes);
app.use("/api/audit-questions", auditQuestionRoutes);
app.use("/api/audit-question-enum-fields", enumFieldsAuditQuestionRoutes);

// Health Check Route
app.get("/", (req, res) => {
  console.log("7️⃣ Handling root request...");
  res.send("🚀 IT Security Compliance API is running...");
});

module.exports = app;
