const express = require("express");
const router = express.Router();
const c = require("../Controller/latestarticlecontroller");

router.get("/", c.getAll);
router.get("/:slug", c.getBySlug);
router.post("/", c.create);
router.put("/:slug", c.update);
router.delete("/:slug", c.remove);

module.exports = router;