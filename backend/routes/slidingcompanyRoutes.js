const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const slidingCompanyController = require("../Controller/slidingcompanycontroller");

// GET /api/sliding-companies
// Saari sliding companies
router.get("/", slidingCompanyController.getAll);

// GET /api/sliding-companies/:slug
// Slug se company
router.get("/:slug", slidingCompanyController.getBySlug);

// POST /api/sliding-companies
// Nayi sliding company
router.post("/", protect, slidingCompanyController.create);

// PUT /api/sliding-companies/:slug
// Company update
router.put("/:slug", protect, slidingCompanyController.update);

// DELETE /api/sliding-companies/:slug
// Company delete
router.delete("/:slug", protect, slidingCompanyController.remove);

module.exports = router;