const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const BlogAuthor = require("../models/BlogAuthor");

// GET /api/blog-authors
// Saare authors
router.get("/", async (req, res) => {
  try {
    const authors = await BlogAuthor.find().sort({ name: 1 });
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Authors is not Featch " });
  }
});

// GET /api/blog-authors/:id
// Custom author ID se author
router.get("/:id", async (req, res) => {
  try {
    const author = await BlogAuthor.findOne({ id: req.params.id });

    if (!author) {
      return res.status(404).json({ message: "Author did not Found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors." });
  }
});

// POST /api/blog-authors
// Naya author
router.post("/", protect, async (req, res) => {
  try {
    const author = await BlogAuthor.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: "Author could not be created." });
  }
});

// PUT /api/blog-authors/:id
// Author update
router.put("/:id", protect, async (req, res) => {
  try {
    const data = { ...req.body };

    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const author = await BlogAuthor.findOneAndUpdate(
      { id: req.params.id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!author) {
      return res.status(404).json({ message: "Author did not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: "Author is not update" });
  }
});

// DELETE /api/blog-authors/:id
// Author delete
router.delete("/:id", protect, async (req, res) => {
  try {
    const author = await BlogAuthor.findOneAndDelete({
      id: req.params.id,
    });

    if (!author) {
      return res.status(404).json({ message: "Author did not found" });
    }

    res.status(200).json({ message: "Author is sucessfully Delete" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Author delete " });
  }
});

module.exports = router;