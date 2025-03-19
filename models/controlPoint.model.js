const mongoose = require("mongoose");

const ControlPointSchema = new mongoose.Schema(
  {
    sectionNumber: { type: String, required: true },
    controlName: { type: String, required: true },
    securityClass: {
      type: String,
      enum: ["A", "J", "M", "none"],
      required: true,
    },
    guidanceExplanation: { type: String, required: true },
    implementationSteps: { type: String, required: true },
    ref41_2015: { type: [String], required: true },
    refISO27001: { type: [String], required: true },
    refNIST800: { type: [String], required: true },
    requirementParameters: { type: String },
    relatedSecurityMeasures: [
      {
        sectionNumber: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    type: { type: String, enum: ["SZ", "EIR"], required: true },
    evaluationTypes: { type: [String], required: true },
    controlType: {
      type: String,
      enum: ["Assuring", "Enabling"],
      required: true,
    },
    nonExcludableFromEvaluation: {
      type: String,
      enum: ["I", "N"],
      required: true,
    },
    csfDocuments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CSFDocument" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ControlPoint", ControlPointSchema);
