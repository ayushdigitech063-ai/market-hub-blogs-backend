const express = require("express");
const router = express.Router();
const brandController = require("../Controller/brandcontroller");
const protect = require("../middleware/authMiddleware");


// PUBLIC ROUTES

// GET /api/brands/featured
router.get("/featured", brandController.getFeatured);

// GET /api/brands
router.get("/", brandController.getAll);

// GET /api/brands/:slug
router.get("/:slug", brandController.getBySlug);

// ADMIN ROUTES — login required

// POST /api/brands
router.post("/", protect, brandController.create);

// PUT /api/brands/:slug
router.put("/:slug", protect, brandController.update);

// DELETE /api/brands/:slug
router.delete("/:slug", protect, brandController.remove);

module.exports = router;