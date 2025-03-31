const mongoose = require("mongoose");
const CSFDocument = require("../models/csfDocument.model");
const {
  getSortingAndPagination,
} = require("../src/utils/sortingAndPagination");

/* Create a new CSF document
 * - Validates required fields before saving */
exports.createCSFDocument = async (req, res) => {
  try {
    const { name, fileName, confluenceLink, description } = req.body;

    // Ensure 'name' is provided
    if (!name) {
      return res.status(400).json({ error: "CSF Document name is required" });
    }

    // Create and save document
    const csfDocument = await CSFDocument.create({
      name,
      fileName,
      confluenceLink,
      description,
    });

    res.status(201).json(csfDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Get all CSF documents with sorting and pagination */
exports.getAllCSFDocuments = async (req, res) => {
  try {
    const { sort, skip, limit, currentPage, pageSize } =
      getSortingAndPagination(req.query);

    // Fetch documents with pagination and sorting
    const [csfDocuments, count] = await Promise.all([
      CSFDocument.find().sort(sort).skip(skip).limit(limit).exec(),
      CSFDocument.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      total: count,
      page: currentPage,
      pages: Math.ceil(count / pageSize),
      data: csfDocuments,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* Get a single CSF document by ID */
exports.getCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findById(req.params.id);
    if (!csfDocument) {
      return res.status(404).json({ message: "CSF Document not found" });
    }

    res.status(200).json(csfDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Update a CSF document by ID
 * - Returns the updated document */
exports.updateCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!csfDocument) {
      return res.status(404).json({ message: "CSF Document not found" });
    }

    res.status(200).json(csfDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Delete a CSF document by ID */
exports.deleteCSFDocument = async (req, res) => {
  try {
    const csfDocument = await CSFDocument.findByIdAndDelete(req.params.id);
    if (!csfDocument) {
      return res
        .status(404)
        .json({ success: false, message: "CSF Document not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "CSF Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
