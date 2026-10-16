

const express = require("express");
const router = express.Router();
const c = require("../Controller/brandcontroller");
const protect = require("../middleware/authMiddleware");

router.get("/featured", c.getFeatured);
router.get("/", c.getAll);
router.get("/:slug", c.getBySlug);


router.post("/", protect, c.create);
router.put("/:slug", protect, c.update);
router.delete("/:slug", protect, c.remove);

module.exports = router;