const express = require("express");
const router = express.Router();

const Article = require("../models/Article");
const protect = require("../middleware/authMiddleware");

// GET /api/articles
// Saare articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ id: 1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Articles could not be fetched." });
  }
});

// GET /api/articles/:id
// Numeric ID se article
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid article ID." });
    }

    const article = await Article.findOne({ id });

    if (!article) {
      return res.status(404).json({ message: "Failed to fetch articles." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles." });
  }
});

// POST /api/articles
// Ek article ya articles ki array create karna
router.post("/", protect, async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      if (!data.length) {
        return res.status(400).json({ message: "The article list is empty." });
      }

      const articles = await Article.insertMany(data);
      return res.status(201).json(articles);
    }

    const article = await Article.create(data);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: "Article could not be created." });
  }
});

// PUT /api/articles/:id
// Article update karna
router.put("/:id", protect, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid article ID." });
    }

    const data = { ...req.body };

    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const article = await Article.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Article could not be updated." });
  }
});

// DELETE /api/articles/:id
// Article delete karna
router.delete("/:id", protect, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid article ID." });
    }

    const article = await Article.findOneAndDelete({ id });

    if (!article) {
      return res.status(404).json({ message: "Article did  Not Found" });
    }

    res.status(200).json({ message: "Article deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Article could not be deleted." });
  }
});

module.exports = router;