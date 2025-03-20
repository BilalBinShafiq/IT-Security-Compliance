const mongoose = require("mongoose");

/**
 * CSFDocument Schema - Represents documents related to the Cybersecurity Framework (CSF).
 */
const CSFDocumentSchema = new mongoose.Schema(
  {
    /**
     * The human-readable name of the document.
     * Example: "Security Policy Guidelines"
     */
    name: { type: String, required: true, trim: true },

    /**
     * The actual file name, if applicable.
     * Example: "security_guidelines.pdf"
     * Optional field.
     */
    fileName: { type: String, default: "", trim: true },

    /**
     * The URL or Confluence link to access the document.
     * Example: "https://confluence.example.com/security-guidelines"
     * Optional field.
     */
    url: { type: String, default: "", trim: true },

    /**
     * A longer description of the document’s content.
     * Example: "This document outlines the security guidelines for the organization."
     * Optional field.
     */
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps automatically.
);

// Export the model
module.exports = mongoose.model("CSFDocument", CSFDocumentSchema);
