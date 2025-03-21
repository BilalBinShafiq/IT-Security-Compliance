const mongoose = require("mongoose");

/**
 * CSFDocument Schema - Represents documents related to the Cybersecurity Framework (CSF).
 */
const CSFDocumentSchema = new mongoose.Schema(
  {
    /* - Required Field
     * - Must be a String.
     * - The human-readable name of the document. */
    name: { type: String, required: true, trim: true },
    /* - Required Field
     * - Must be a String.
     * - The human-readable name of the document. */
    fileName: { type: String, default: "", trim: true },
    /* - Optional Field
     * - Must be a String.
     * - The URL to access the document (for example, a Confluence link) */
    confluenceLink: { type: String, default: "", trim: true },
    /* - Optional Field
     * - Must be a String.
     * - A longer description of the document’s content */
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps automatically.
);

// Export the model
module.exports = mongoose.model("CSFDocument", CSFDocumentSchema);
