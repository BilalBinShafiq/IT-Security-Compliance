const express = require("express");
const router = express.Router();
const CSFDocument = require("../models/csfDocument.model");

router.post("/", async (req, res) => {
  try {
    const document = await CSFDocument.create(req.body);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const documents = await CSFDocument.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
