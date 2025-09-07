const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadController = require("../controllers/uploadController");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/", upload.single("resume"), uploadController.handleResumeUpload);

module.exports = router;