

const express = require("express");
const router = express.Router();
const c = require("../Controller/brandcontroller");
const protect = require("../middleware/authMiddleware");

// Public (website ke liye)
router.get("/featured", c.getFeatured);
router.get("/", c.getAll);
router.get("/:slug", c.getBySlug);

// Sirf logged-in admin ke liye
router.post("/", protect, c.create);
router.put("/:slug", protect, c.update);
router.delete("/:slug", protect, c.remove);

module.exports = router;