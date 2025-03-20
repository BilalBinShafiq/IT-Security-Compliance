const mongoose = require("mongoose");

/**
 * ControlPoint Schema - Represents IT security compliance control points.
 */
const ControlPointSchema = new mongoose.Schema(
  {
    /**
     * Hierarchical identifier of the control point (e.g., "1.1", "3.1.1.4").
     */
    sectionNumber: { type: String, required: true, trim: true },

    /**
     * The name of the control point (e.g., "Information Security Policy").
     */
    controlName: { type: String, required: true, trim: true },

    /**
     * Security classification of the control.
     * Allowed values:
     *  - "A"
     *  - "J"
     *  - "M"
     *  - "none" (equivalent to "egyik sem")
     */
    securityClass: {
      type: String,
      enum: ["A", "J", "M", "none"],
      required: true,
      trim: true,
    },

    /**
     * Detailed guidance and explanation of the control.
     */
    guidanceExplanation: { type: String, required: true, trim: true },

    /**
     * Implementation steps as a multi-line text (stored as a single string).
     */
    implementationSteps: { type: String, required: true, trim: true },

    /**
     * References to the Hungarian 41/2015 regulation.
     * Example:
     *  - ["3.1.1.1. Information Security Policy", "3.1.1.4 BYD Policy"]
     * If no value exists, store ["no value"].
     */
    ref41_2015: { type: [String], required: true, trim: true },

    /**
     * References to ISO 27001.
     * Example:
     *  - ["4.1", "4.2", "A.5.31"]
     */
    refISO27001: { type: [String], required: true, trim: true },

    /**
     * References to NIST SP 800.
     * Example:
     *  - ["PM1"]
     */
    refNIST800: { type: [String], required: true, trim: true },

    /**
     * Free-text requirement parameters related to the control.
     * Optional field.
     */
    requirementParameters: { type: String, default: "", trim: true },

    /**
     * Related security measures.
     * Each object contains:
     *  - sectionNumber (string) → e.g., "5.14"
     *  - name (string) → e.g., "Continuous Monitoring"
     */
    relatedSecurityMeasures: [
      {
        sectionNumber: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
      },
    ],

    /**
     * Type of the control.
     * Allowed values:
     *  - "SZ"
     *  - "EIR"
     */
    type: { type: String, enum: ["SZ", "EIR"], required: true, trim: true },

    /**
     * Evaluation types - Specifies how the control is evaluated.
     * Example values:
     *  - ["Document", "Test", "Interview", "Other", "none"]
     */
    evaluationTypes: { type: [String], required: true, trim: true },

    /**
     * Type of control:
     * Allowed values:
     *  - "Assuring"
     *  - "Enabling"
     */
    controlType: {
      type: String,
      enum: ["Assuring", "Enabling"],
      required: true,
      trim: true,
    },

    /**
     * Whether the control is non-excludable from evaluation.
     * Allowed values:
     *  - "I" (Mandatory for evaluation)
     *  - "N" (Not mandatory)
     */
    nonExcludableFromEvaluation: {
      type: String,
      enum: ["I", "N"],
      required: true,
      trim: true,
    },

    /**
     * References to CSF documents.
     * These documents are stored in the "csfDocuments" collection.
     */
    csfDocuments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CSFDocument" },
    ],
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps automatically.
);

/**
 * 🔹 Create Indexes for Optimized Queries 🔹
 *  - Ensures efficient lookups for filtering and searching.
 *  - Declared explicitly using `schema.index()` to prevent duplicate index warnings.
 */
ControlPointSchema.index({ sectionNumber: 1 });
ControlPointSchema.index({ controlName: 1 });
ControlPointSchema.index({ securityClass: 1 });

// Export the model
module.exports = mongoose.model("ControlPoint", ControlPointSchema);
