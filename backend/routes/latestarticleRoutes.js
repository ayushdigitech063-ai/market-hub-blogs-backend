
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const latestArticleController = require("../Controller/latestarticlecontroller");

// GET /api/latest-articles
// Fetch all active latest articles
// The existing controller handles the ?all=true behavior.
router.get("/", latestArticleController.getAll);

// GET /api/latest-articles/:slug
// Fetch an article by slug
router.get("/:slug", latestArticleController.getBySlug);

// POST /api/latest-articles
// Create a new article
router.post("/", protect, latestArticleController.create);

// PUT /api/latest-articles/:slug
// Update an existing article
router.put("/:slug", protect, latestArticleController.update);

// DELETE /api/latest-articles/:slug
// Delete an article
router.delete("/:slug", protect, latestArticleController.remove);

module.exports = router;
