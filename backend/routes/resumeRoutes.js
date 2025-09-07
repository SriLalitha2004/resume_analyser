const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

router.get("/", resumeController.getAllResumes);
router.get("/:id", resumeController.getResumeById);

module.exports = router;