

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image 5MB se chhoti honi chahiye."
          : err.message || "Image upload nahi ho payi.";

      return res.status(400).json({ error: msg });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image nahi mili." });
    }

    return res.status(200).json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  });
});

module.exports = router;
