
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Company = require("../models/Company");

// GET /api/companies
// Fetch all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies." });
  }
});

// POST /api/companies
// Create a new company
router.post("/", protect, async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: "Failed to create company." });
  }
});

// PUT /api/companies/:slug
// Update company
router.put("/:slug", protect, async (req, res) => {
  try {
    const data = { ...req.body };

    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const company = await Company.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: "Failed to update company." });
  }
});

// DELETE /api/companies/:slug
// Delete company
router.delete("/:slug", protect, async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.status(200).json({ message: "Company deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company." });
  }
});

module.exports = router;
