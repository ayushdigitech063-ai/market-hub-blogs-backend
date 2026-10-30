
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// POST /api/upload
// Allow admins to upload images
router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please select an image.",
    });
  }

  return res.status(201).json({
    message: "Image uploaded successfully.",
    url: req.file.path,
    filename: req.file.filename,
  });
});

module.exports = router;
