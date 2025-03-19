const mongoose = require("mongoose");

const CSFDocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fileName: { type: String },
    confluenceLink: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CSFDocument", CSFDocumentSchema);
