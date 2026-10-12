const express = require('express');
const router = express.Router();
const BlogArticle = require('../models/BlogArticle');

// GET: saare articles (?authorId=amish-tripathi se filter bhi ho sakta hai)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.authorId ? { authorId: req.query.authorId } : {};
    const articles = await BlogArticle.find(filter).sort({ _id: 1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: ek article slug se
router.get('/slug/:slug', async (req, res) => {
  try {
    const article = await BlogArticle.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: article add karo
router.post('/', async (req, res) => {
  try {
    const saved = Array.isArray(req.body)
      ? await BlogArticle.insertMany(req.body)
      : await new BlogArticle(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: article update karo
router.put('/slug/:slug', async (req, res) => {
  try {
    const updated = await BlogArticle.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, strict: false }
    );
    if (!updated) return res.status(404).json({ error: 'Article not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: article delete karo
router.delete('/slug/:slug', async (req, res) => {
  try {
    const deleted = await BlogArticle.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted', slug: deleted.slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;