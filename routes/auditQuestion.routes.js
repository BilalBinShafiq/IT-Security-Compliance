const express = require("express");
const router = express.Router();
const AuditQuestion = require("../models/auditQuestion.model");

router.post("/", async (req, res) => {
  try {
    const question = await AuditQuestion.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await AuditQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
