require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db"); // Import the DB connection
const controlPointRoutes = require("./routes/controlPoint.routes");
const csfDocumentRoutes = require("./routes/csfDocument.routes");
const auditQuestionRoutes = require("./routes/auditQuestion.routes");

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true })); // Form parser

// Routes
app.use("/api/control-points", controlPointRoutes);
app.use("/api/csf-documents", csfDocumentRoutes);
app.use("/api/audit-questions", auditQuestionRoutes);

app.get("/", (req, res) => {
  res.send("IT Security Compliance API is running...");
});

module.exports = app;
