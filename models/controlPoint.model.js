const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

// ControlPoint Schema - This collection stores the IT security compliance control points
const ControlPointSchema = new mongoose.Schema(
  {
    /* - Required Field
     * - Must be a String
     * - Represents a unique hierarchical identifier
     * - Example Values:
     *    - "1.1"
     *    - "3.1.1.4" */
    sectionNumber: { type: String, required: true, trim: true },

    /* - Required Field
     * - Must be a String
     * - The name of the control point.
     * - Example Values:
     *    - "Information Security Policy" */
    controlName: { type: String, required: true, trim: true },

    /* - Required Field
     * - Must be a String
     * - Allowed values:
     *    - "A", "J", "M", "none" */
    securityClass: {
      type: String,
      enum: ["A", "J", "M", "none"],
      required: true,
      trim: true,
    },

    /* Required Field
     * - Must be a String
     * - A long text stored in a single field that contains both guidance and explanation. */
    guidanceExplanation: { type: String, required: true, trim: true },

    /* - Required Field
     * - Must be a String
     * - A multi-line text field where each step is separated by line breaks */
    implementationSteps: { type: String, required: true, trim: true },

    /* - Required Field
     * - Must be an Array of Strings.
     * - If there is no value, it may contain the element "no value".
     * - Example Values:
     *    - ["3.1.1.1. Information Security Policy", "3.1.1.4 BYD Policy"]. */
    ref41_2015: { type: [String], required: true, trim: true },

    /* - Required Field
     * - Must be an Array of Strings.
     * - References to ISO 27001 compliance sections.
     * - Example Values:
     *    - ["4.1", "4.2", "A.5.31"]. */
    refISO27001: { type: [String], required: true, trim: true },

    /* - Required Field
     * - Must be an Array of Strings.
     * - References to NIST SP 800 compliance sections.
     * - Example Values:
     *    - ["PM1"]. */
    refNIST800: { type: [String], required: true, trim: true },

    /* - Optional Field
     * - Must be a String
     * - Free text to specify parameters related to the control. */
    requirementParameters: { type: String, default: "", trim: true },

    /* - Required Field
     * - Must be an array of Objects.
     * - Each element contains the section number and name of the related security measure.
     * - Example Values:
     *    - { "sectionNumber": "5.14", "name": "Continuous Monitoring" } */
    relatedSecurityMeasures: [
      {
        sectionNumber: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
      },
    ],

    /* - Required Field
     * - Must be a String
     * - Allowed values:
     *    - "SZ" or "EIR". */
    type: { type: String, enum: ["SZ", "EIR"], required: true, trim: true },

    /* - Required Field
     * - Must be aa Array of Strings.
     * - Allowed values:
     *    -  "Document", "Test", "Interview", "Other", "none". */
    evaluationTypes: { type: [String], required: true, trim: true },

    /* - Required Field
     * - Must be aa Array of Strings.
     * - Allowed values:
     *  - "Assuring" (Ensures security measures are effective)
     *  - "Enabling" (Supports security operations) */
    controlType: {
      type: String,
      enum: ["Assuring", "Enabling"],
      required: true,
      trim: true,
    },

    /* - Required Field
     * - (If the value is "I", then that control cannot be excluded from evaluation, meaning it is mandatory to check.)
     * - Allowed values:
     *    - "I", "N" */
    nonExcludableFromEvaluation: {
      type: String,
      enum: ["I", "N"],
      required: true,
      trim: true,
    },

    /* - Optional Field
     * - Array of ObjectId
     * - An array of ObjectId references to CSF Documents stored in the "csfDocuments" collection
     * - ✅ Autopopulate enabled on csfDocuments
     */
    csfDocuments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CSFDocument",
        autopopulate: true,
      },
    ],
  },
  { timestamps: true } // Adds "createdAt" and "updatedAt" timestamps automatically.
);

/* - Create Indexes for Optimized Queries
 *   - Ensures efficient lookups for filtering and searching.
 *   - Declared explicitly using `schema.index()` to prevent duplicate index warnings */
ControlPointSchema.index({ sectionNumber: 1 });
ControlPointSchema.index({ controlName: 1 });
ControlPointSchema.index({ securityClass: 1 });

// Export the model
module.exports = mongoose.model("ControlPoint", ControlPointSchema);
