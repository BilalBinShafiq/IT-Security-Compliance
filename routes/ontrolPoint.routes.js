const express = require("express");
const router = express.Router();
const controlPointController = require("../controllers/controlPoint.controller");

router.post("/", controlPointController.createControlPoint);
router.get("/", controlPointController.getAllControlPoints);
router.get("/:id", controlPointController.getControlPoint);
router.put("/:id", controlPointController.updateControlPoint);
router.delete("/:id", controlPointController.deleteControlPoint);

module.exports = router;
