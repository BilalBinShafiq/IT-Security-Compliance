const mongoose = require("mongoose");

const AuditQuestionSchema = new mongoose.Schema(
  {
    controlRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ControlPoint",
      required: true,
    },
    controlIdentifier: { type: String, required: true },
    controlName: { type: String, required: true },
    auditQuestionIdentifier: { type: String, required: true, unique: true },
    auditQuestion: { type: String, required: true },
    auditQuestionInstructions: { type: String, required: true },
    questionType: { type: String, enum: ["audit", "GAP"], required: true },
  },
  { timestamps: true }
);

// Generate a unique audit question identifier if not provided
AuditQuestionSchema.pre("save", async function (next) {
  if (!this.auditQuestionIdentifier) {
    const count = await this.constructor.countDocuments();
    this.auditQuestionIdentifier = `K01.${(count + 1)
      .toString()
      .padStart(3, "0")}_P[1]`;
  }
  next();
});

module.exports = mongoose.model("AuditQuestion", AuditQuestionSchema);
