const mongoose = require("mongoose");

/**
 * AuditQuestion Schema - Represents audit questions linked to a control point.
 */
const AuditQuestionSchema = new mongoose.Schema(
  {
    /* - Required Field
     * - Must be a Reference of ObjectId.
     * - A reference to the associated control point document (from the controlPoints collection) */
    controlRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ControlPoint",
      required: true,
    },
    /* - Required Field
     * - Must be a String.
     * - The identifier of the control point
     * - (This is provided to the user when selecting the control point)
     * - Example Values:
     *    - "1.1" */
    controlIdentifier: { type: String, required: true, trim: true },
    /* - Required Field
     * - Must be a String.
     * - The name of the control
     * - Example Values:
     *    - "Information Security Policy" */
    controlName: { type: String, required: true, trim: true },
    /* - Required Field
     * - Must be a String.
     * - A unique identifier for the audit question
     * - If the user does not provide it, the system must generate one
     * - Example Values:
     *    - "K01.001_P[1]" */
    auditQuestionIdentifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    /* - Required Field
     * - Must be a String.
     * - The description of the audit question
     * - Example Values:
     *    - "How often is the organization-wide Information Security Policy reviewed and updated?" */
    auditQuestion: { type: String, required: true, trim: true },
    /* - Required Field
     * - Must be a String.
     * - The instructions necessary to fulfill the audit question
     * - Example Values:
     *    - "Ensure that the organization-wide frequency and scope of updates are documented in the IBSZ" */
    auditQuestionInstructions: { type: String, required: true, trim: true },
    /* - Required Field
     * - Must be a String.
     * - Differentiates the type of question
     * - This field allows later queries to separately retrieve audit and GAP questions
     * - Possible Values:
     *    - "audit" or "GAP" */
    questionType: {
      type: String,
      enum: ["audit", "GAP"],
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds "createdAt" and "updatedAt" fields.
);

/**
 * Middleware: Generate a unique auditQuestionIdentifier if not provided by the user.
 * Format: "K01.XXX_P[1]", where XXX is a zero-padded counter.
 */
AuditQuestionSchema.pre("save", async function (next) {
  if (!this.auditQuestionIdentifier) {
    const count = await this.constructor.countDocuments();
    this.auditQuestionIdentifier = `K01.${(count + 1)
      .toString()
      .padStart(3, "0")}_P[1]`;
  }
  next();
});

// Export the model
module.exports = mongoose.model("AuditQuestion", AuditQuestionSchema);
