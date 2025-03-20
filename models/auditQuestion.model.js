const mongoose = require("mongoose");

/**
 * AuditQuestion Schema - Represents audit questions linked to a control point.
 */
const AuditQuestionSchema = new mongoose.Schema(
  {
    /**
     * Reference to the associated control point.
     * This establishes a relationship between the audit question and the corresponding control point.
     */
    controlRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ControlPoint",
      required: true,
    },

    /**
     * The identifier of the control point.
     * Example values: "1.1", "3.1.1.4".
     * This is provided when selecting the control point.
     */
    controlIdentifier: { type: String, required: true, trim: true },

    /**
     * The name of the control point this audit question is linked to.
     * Example: "Information Security Policy".
     */
    controlName: { type: String, required: true, trim: true },

    /**
     * A unique identifier for the audit question.
     * Example: "K01.001_P[1]".
     * If the user does not provide one, the system will generate it automatically.
     */
    auditQuestionIdentifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    /**
     * The text of the audit question.
     * Example: "How often is the organization-wide Information Security Policy reviewed and updated?"
     */
    auditQuestion: { type: String, required: true, trim: true },

    /**
     * Instructions on how to properly evaluate the audit question.
     * Example: "Ensure that the organization-wide frequency and scope of updates are documented in the IBSZ."
     */
    auditQuestionInstructions: { type: String, required: true, trim: true },

    /**
     * Specifies the type of audit question.
     * Allowed values:
     *  - "audit" (General audit questions)
     *  - "GAP" (Gap analysis questions)
     */
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
