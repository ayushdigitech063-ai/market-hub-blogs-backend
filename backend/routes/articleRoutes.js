const express = require('express');
const router = express.Router();
const Article = require('../models/Article');


router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ id: 1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ id: Number(req.params.id) });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const saved = Array.isArray(req.body)
      ? await Article.insertMany(req.body)
      : await new Article(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Article.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: req.body },
      { new: true, strict: false }
    );
    if (!updated) return res.status(404).json({ error: 'Article not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const query = req.params.id;
    let article = await Article.findOne({ slug: query });
    if (!article) {
      article = await Article.findOne({ id: isNaN(query) ? query : Number(query) });
    }
    if (!article && query.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(query);
    }
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Article.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted', id: deleted.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;