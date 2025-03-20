require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controlPointRoutes = require("../routes/controlPoint.routes.js");
const csfDocumentRoutes = require("../routes/csfDocument.routes.js");
const auditQuestionRoutes = require("../routes/auditQuestion.routes.js");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json({ limit: "10mb" })); // Parse JSON with size limit
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.use("/api/control-points", controlPointRoutes);
app.use("/api/csf-documents", csfDocumentRoutes);
app.use("/api/audit-questions", auditQuestionRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 IT Security Compliance API is running...");
});

module.exports = app;
