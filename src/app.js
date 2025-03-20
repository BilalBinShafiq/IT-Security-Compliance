console.log("2️⃣ Loading app.js...");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controlPointRoutes = require("../routes/controlPoint.routes");
const csfDocumentRoutes = require("../routes/csfDocument.routes");
const auditQuestionRoutes = require("../routes/auditQuestion.routes");

const app = express();

// Middleware
console.log("4️⃣ Setting up middleware...");
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json({ limit: "10mb" })); // Parse JSON with size limit
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
console.log("5️⃣ Loading routes...");
app.use("/api/control-points", controlPointRoutes);
app.use("/api/csf-documents", csfDocumentRoutes);
app.use("/api/audit-questions", auditQuestionRoutes);

// Health Check Route
app.get("/", (req, res) => {
  console.log("7️⃣ Handling root request...");
  res.send("🚀 IT Security Compliance API is running...");
});

module.exports = app;
