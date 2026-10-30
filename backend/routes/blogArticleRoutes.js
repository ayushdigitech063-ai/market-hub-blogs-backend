const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const BlogArticle = require("../models/BlogArticle");

// GET /api/blog-articles
// Saare blog articles
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.authorId) {
      filter.authorId = req.query.authorId;
    }

    const articles = await BlogArticle.find(filter).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog articles." });
  }
});

// GET /api/blog-articles/slug/:slug
// Slug se blog article
router.get("/slug/:slug", async (req, res) => {
  try {
    const article = await BlogArticle.findOne({
      slug: req.params.slug,
    });

    if (!article) {
      return res.status(404).json({ message: "Blog article not found." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog article." });
  }
});

// POST /api/blog-articles
// Naya blog article
router.post("/", protect, async (req, res) => {
  try {
    const article = await BlogArticle.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: "Blog article could not be created." });
  }
});

// PUT /api/blog-articles/slug/:slug
// Blog article update
router.put("/slug/:slug", protect, async (req, res) => {
  try {
    const data = { ...req.body };

    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const article = await BlogArticle.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Blog article not found." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Blog article could not be updated." });
  }
});

// DELETE /api/blog-articles/slug/:slug
// Blog article delete
router.delete("/slug/:slug", protect, async (req, res) => {
  try {
    const article = await BlogArticle.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!article) {
      return res.status(404).json({ message: "Blog article not found." });
    }

    res.status(200).json({ message: "Blog article deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Blog article could not be deleted." });
  }
});

module.exports = router;