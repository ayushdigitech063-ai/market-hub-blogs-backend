

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image size is  must be small 5MB"
          : err.message || "Image is  Not Uploaded";

      return res.status(400).json({ error: msg });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is Not Found" });
    }

    return res.status(200).json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  });
});

module.exports = router;
