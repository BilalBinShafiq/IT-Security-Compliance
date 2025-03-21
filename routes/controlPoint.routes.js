console.log("3️⃣ Loading controlPoint.routes.js...");

const express = require("express");
const router = express.Router();
const controlPointController = require("../controllers/controlPoint.controller");
const validateObjectId = require("../src/utils/validateObjectId");

router.post("/", (req, res) => {
  console.log("📌 Handling POST /api/control-points");
  controlPointController.createControlPoint(req, res);
});

router.get("/", (req, res) => {
  console.log("📌 Handling GET /api/control-points");
  controlPointController.getAllControlPoints(req, res);
});

router.get("/:id", validateObjectId("Control Point ID"), (req, res) => {
  console.log(`📌 Handling GET /api/control-points/${req.params.id}`);
  controlPointController.getControlPoint(req, res);
});

router.put("/:id", validateObjectId("Control Point ID"), (req, res) => {
  console.log(`📌 Handling PUT /api/control-points/${req.params.id}`);
  controlPointController.updateControlPoint(req, res);
});

router.delete("/:id", validateObjectId("Control Point ID"), (req, res) => {
  console.log(`📌 Handling DELETE /api/control-points/${req.params.id}`);
  controlPointController.deleteControlPoint(req, res);
});

module.exports = router;
